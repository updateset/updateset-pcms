import { CollectionAfterChangeHook } from 'payload'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Workflow as WorkflowGlobal } from '@/payload-types'

export const workflow: CollectionAfterChangeHook = async ({
    collection,
    operation,
    previousDoc,
    doc,
    req,
}) => {
    const n8nUrl = `${process.env.N8N_URL}${process.env.N8N_PATH}`;
    const workflow = (await getCachedGlobal('workflow', 1)()) as WorkflowGlobal;
    const reqHost = req.host;
    const rawIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const ip = rawIp.includes('::ffff:') ? rawIp.split(':').pop() : rawIp;
    const protocol = req.headers.get('x-forwarded-proto') || req.headers.get('x-forwarded-proto') || 'http';
    const url = `${protocol}://${reqHost}`;

    interface Workflow {
        id?: string | null;
        collection?: string | null;
        path?: string | null;
    }

    for (const wf of (workflow.collections || []) as Workflow[]) {
        if (wf.collection === collection.slug) {

            const record = await req.payloadDataLoader.find({
                collection: collection.slug,
                where: {
                    id: doc.id
                },
                depth: 2,
                req,
            });

            try {
                await fetch(n8nUrl + wf.path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.N8N_TOKEN}`,
                    },
                    body: JSON.stringify({ collection, operation, previousDoc, doc, record, url, ip }),
                }).then((res) => {
                    if (!res.ok) {
                        console.error(`Error sending data to N8N`)
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }
    }


}