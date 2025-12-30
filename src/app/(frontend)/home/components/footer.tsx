export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex flex-col gap-4 md:gap-0">
          {/* Logo, Copyright, and Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            {/* Logo - Left Side */}
            <div className="flex justify-start md:justify-start">
              <img src="/updateset.png" alt="UpdateSet" className="h-32 w-auto" />
            </div>

            {/* Copyright - Middle */}
            <div className="text-center content-center">
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} UpdateSet. All rights reserved.
              </span>
            </div>

            {/* Contact Links - Right Side */}
            <div className="flex gap-6 text-sm text-muted-foreground justify-center md:justify-end">
              <a href="tel:123-456-7890" className="hover:text-foreground transition-colors">
                123-456-7890
              </a>
              <a
                href="mailto:Hello@updateset.com"
                className="hover:text-foreground transition-colors"
              >
                Hello@updateset.com
              </a>
              <a
                href="https://www.linkedin.com/company/updateset"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
