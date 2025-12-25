import { Button } from '@/components/ui/button';
import { CONTACT_EMAIL, buildMailto } from '@/lib/contact';
import { CopyableTemplateBox } from '@/components/app/copyable-template-box';

const COMMISSION_TEMPLATE = `Project Overview- custom requests, color scheme details, influences, etc:
Model list- if you don't know the full details yet, thats okay too!:
Timeline Restraints- tournament/GT/event needs, etc:
Budget Range (optional)- if you have an idea of what you're looking to spend on the commission going in, this often helps!:`;

export default function CommissionsPage() {
  return (
    <div className="site-section">

      <div className="mx-auto max-w-240">
        {/* CTA card */}
        <section className="mb-12">
          <div className="site-card items-center bg-warm-accent/7">
            <div className="flex flex-col gap-4 sm:flex-row items-center sm:justify-between">
              <div className="space-y-4">
                <h2 className="text-primary text-5xl text-center font-semibold">
                  Commissions - Open
                </h2>
                <h2 className="text-l text-center font-semibold">
                  Recommended Lead Time: 4-6 weeks
                </h2>
                <p className="text-muted-foreground text-center max-w-full">
                  With over a decade running a one-man studio, Ive personally
                  painted thousands of miniatures made from all kinds of
                  materials. From big armies to single toy repaints, I treat each
                  project with care. I love working closely with my clients on
                  custom projects to bring their visions to life!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process overview */}
        <section className="mb-12">
          <h2 className="text-primary mb-4 text-center text-4xl font-semibold">
            My Workflow Highlights
          </h2>
          <div className="grid gap-2 text-center sm:grid-cols-3">
            <div className="site-card bg-warm-accent/7">
              <h3 className="mb-2 font-semibold">Flexible Options</h3>
              <p className="text-muted-foreground text-sm">
                I love working WITH my clients. I check in often during the
                painting process for INPUT, not just for updates. I build these
                decision points into my process to ensure youre thrilled with the
                final result.
              </p>
            </div>

            <div className="site-card bg-warm-accent/7">
              <h3 className="mb-2 font-semibold">Structured Quote</h3>
              <p className="text-muted-foreground text-sm">
                I provide a clear quote for your commission before we begin. We
                establish a price ceiling and identify a few potential areas of
                flexibility in the project. Full transparency. No surprises!
              </p>
            </div>

            <div className="site-card bg-warm-accent/7">
              <h3 className="mb-2 font-semibold">Open Communication</h3>
              <p className="text-muted-foreground text-sm">
                Things come up, ideas change, and projects evolve. I maintain open
                lines of communication throughout my entire process. We might even
                discover new ideas together as we go!
              </p>
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact" className="scroll-mt-8">
          <div className="site-card bg-warm-accent/7">
            <div className="space-y-4">
              <div className="space-y-4 text-center">
                <p className="text-primary text-4xl font-semibold">
                  Interested in a commission?
                </p>
                <h2 className="text-primary text-3xl font-semibold">
                  Get in Touch!
                </h2>
                <p className="text-muted-foreground text-sm">
                  Email me at:{' '}
                  <a
                    className="text-foreground underline underline-offset-4"
                    href={buildMailto({ subject: 'Commission request' })}
                  >
                    {CONTACT_EMAIL}
                  </a>{' '}
                  with some project details.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-foreground text-sm text-center font-medium">
                  Copy this template if you aren&apos;t sure what to include:
                </p>
                <div className="bg-background/70 ring-border rounded-lg p-4 ring-1">
                  <CopyableTemplateBox value={COMMISSION_TEMPLATE} />
                </div>
              </div>

              <div className="flex justify-center">
                <Button asChild size="lg">
                  <a
                    href={buildMailto({
                      subject: 'Commission request',
                      body: COMMISSION_TEMPLATE,
                    })}
                  >
                    Email Me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
