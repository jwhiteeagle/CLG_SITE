import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CommissionsPage() {
  return (
    <div className="site-section">
      <div className="page-header">
        <h1>Commissions</h1>
        <p>How the process works and how to get started</p>
      </div>

      {/* Process overview */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">The Process</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="site-card">
            <h3 className="mb-2 font-semibold">1. Inquiry</h3>
            <p className="text-sm text-muted-foreground">
              Reach out with details about your project and models.
            </p>
          </div>
          <div className="site-card">
            <h3 className="mb-2 font-semibold">2. Quote</h3>
            <p className="text-sm text-muted-foreground">
              Receive a detailed quote based on complexity and timeline.
            </p>
          </div>
          <div className="site-card">
            <h3 className="mb-2 font-semibold">3. Painting</h3>
            <p className="text-sm text-muted-foreground">
              Work begins with progress updates along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="max-w-md">
        <h2 className="mb-4 text-xl font-semibold">Get in Touch</h2>
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
