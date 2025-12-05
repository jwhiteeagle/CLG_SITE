import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CommissionsPage() {
  return (
    <div className="site-section">
      <div className="page-header" >
        <h1 className="mb-2 font-semibold text-primary">Commission Painting Services</h1>
      </div>

      {/* CTA card */}
      <section className="mb-12">
        <div className="site-card bg-warm-accent/7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                Commissions - Open
              </h2>
              <h2 className="text-l font-semibold">
                Recommended Lead Time: 4-6 weeks
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                With over a decade running a one-man studio, I've personally painted thousands of miniatures made from all kinds of materials.
                From big armies to single toy repaints, I treat each project with care.
                I love working closely with my clients on custom projects to bring their visions to life!
              </p>
            </div>
            <Button size="lg" className="shrink-0" asChild>
              <a href="#contact">Tell me about your project!</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Process overview */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-primary">My Workflow Highlights</h2>
        <div className="grid gap-2 sm:grid-cols-3">

          <div className="site-card bg-warm-accent/7">
            <h3 className="mb-2 font-semibold">Flexible Options</h3>
            <p className="text-sm text-muted-foreground">
              I love working WITH my clients. I check in often during the painting process for INPUT, not just for updates.
              I build these decision points into my process to ensure you're thrilled with the final result.
            </p>            
          </div>

          <div className="site-card bg-warm-accent/7">
            <h3 className="mb-2 font-semibold">Structured Quote</h3>
            <p className="text-sm text-muted-foreground">
              I provide a clear quote for your commission before we begin.
              We establish a price ceiling and identify a few potential areas of flexibility in the project.
              Full transparency. No surprises! 
            </p>
          </div>

          <div className="site-card bg-warm-accent/7">
            <h3 className="mb-2 font-semibold">Open Communication</h3>
            <p className="text-sm text-muted-foreground">
              Things come up, ideas change, and projects evolve. 
              I maintain open lines of communication throughout my entire process.
              We might even discover new ideas together as we go!
            </p>            
          </div>

        </div>
      </section>

      {/* Contact form */}
      <section id="contact" className="max-w-md scroll-mt-8">
        <h2 className="mb-4 text-xl font-semibold text-primary">Get in Touch</h2>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="message">Project Details</Label>
            <Textarea
              id="message"
              placeholder="Tell me about your project..."
              rows={4}
            />
          </div>
          <Button type="submit">Send Inquiry</Button>
        </form>
      </section>
    </div>
  );
}
