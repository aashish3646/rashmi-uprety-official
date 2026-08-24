import { Container } from "./layout/Container";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Container as="header" className="pt-14 pb-4 md:pt-24 md:pb-6">
      <Reveal className="grid gap-6 md:grid-cols-12">
        <p className="meta text-clay md:col-span-3">{eyebrow}</p>
        <div className="md:col-span-9">
          <h1 className="display-xl">{title}</h1>
          {intro ? <p className="lede mt-7 max-w-[52ch]">{intro}</p> : null}
        </div>
      </Reveal>
    </Container>
  );
}
