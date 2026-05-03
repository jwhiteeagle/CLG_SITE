import { Button } from '@/components/ui/button';
import { CONTACT_EMAIL, buildMailto } from '@/lib/contact';
import { CopyableTemplateBox } from '@/components/app/copyable-template-box';
import { CtaCard } from '@/components/app/cta-card';

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
          <CtaCard withContainer={false}>
            <div className="space-y-4">
              <h2 className="type-cta-title text-center">
                Commissions - Open
              </h2>
              <p className="type-cta-subtitle text-center">
                Recommended Lead Time: 4-6 weeks
              </p>
            </div>
          </CtaCard>
        </section>

        {/* Contact form */}
        <section id="contact" className="scroll-mt-8">
          <CtaCard withContainer={false}>
            <div className="space-y-4">
              <div className="space-y-4 text-center">
                <p className="type-cta-title">Interested in a commission?</p>
                <h2 className="type-page-title">Get in Touch!</h2>
                <p className="type-cta-lede">
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
                <p className="type-body-sm text-foreground text-center font-medium">
                  Copy this template if you aren&apos;t sure what to include:
                </p>
                <div className="bg-background/70 ring-border rounded-none p-4 ring-1">
                  <CopyableTemplateBox value={COMMISSION_TEMPLATE} />
                </div>
              </div>

              <div className="flex justify-center">
                <Button asChild size="lg">
                  <a
                    href={buildMailto({
                      subject: 'Commission request',
                    })}
                    aria-label={`Email ${CONTACT_EMAIL} about a commission`}
                  >
                    Email Me
                  </a>
                </Button>
              </div>
            </div>
          </CtaCard>
        </section>
      </div>
    </div>
  );
}
