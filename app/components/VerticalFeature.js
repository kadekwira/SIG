import { VerticalFeatureRow } from './feature/VerticalFeatureRow';
import { Section } from './Section';

const VerticalFeatures = () => (
  <>
    <Section
      title="Why Beaches?"
      description="Beaches are not just beautiful destinations; they offer numerous benefits and unique features."
    >
      <VerticalFeatureRow
        title="Importance of Beaches"
        description="Beaches play a crucial role in the environment and economy. They act as natural barriers against storms, provide habitats for wildlife, and are popular tourist destinations that boost local economies."
        image="bg.jpg"
        imageAlt="Importance of Beaches"
      />
      <VerticalFeatureRow
        title="Unique Features of Beaches"
        description="Each beach has its unique charm, from the white sands and clear waters to the vibrant ecosystems and recreational opportunities. Discover what makes each beach special and why they are beloved by many."
        image="background.jpg"
        imageAlt="Unique Features of Beaches"
        reverse
      />
    </Section>
  </>
);

export { VerticalFeatures };
