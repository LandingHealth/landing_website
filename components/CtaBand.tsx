import ButtonLink from "@/components/ButtonLink";
import { container, sectionPad, type } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className={`border-t border-ink/10 ${sectionPad}`}>
      <div className={container}>
        <div data-reveal className="max-w-2xl">
          <h2 className={type.h2}>See how SafeSock works.</h2>
          <p className={`${type.body} mt-5`}>
            SafeSock is a Landing product designed to show how patients bear weight between appointments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/devices#demo" variant="primary">Watch the demo</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
