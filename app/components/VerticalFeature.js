import { VerticalFeatureRow } from './feature/VerticalFeatureRow';
import { Section } from './Section';

const VerticalFeatures = () => (
  <>
    <Section
      title="Kenapa Go-Beach ?"
      description="Go-Beach membantu Anda mencari wisata pantai di Kabupaten Badung dengan informasi  yang lebih spesifik."
    >
      <VerticalFeatureRow
        title="Map Interaktif"
        description="Menampilkan pantai di Kabupaten Badung yang letaknya tidak jauh dari lokasi Anda."
        image="bg.jpg"
        imageAlt="Importance of Beaches"
      />
      <VerticalFeatureRow
        title="Rekomendasi Terdekat"
        description="Menampilkan pantai di Kabupaten Badung yang letaknya tidak jauh dari lokasi Anda."
        image="background.jpg"
        imageAlt="Unique Features of Beaches"
        reverse
      />
        <VerticalFeatureRow
        title="Rute"
        description="Menampilkan pantai di Kabupaten Badung yang letaknya tidak jauh dari lokasi Anda."
        image="bg.jpg"
        imageAlt="Importance of Beaches"
      />
            <VerticalFeatureRow
        title="Informasi Pantai"
        description="Menampilkan pantai di Kabupaten Badung yang letaknya tidak jauh dari lokasi Anda."
        image="background.jpg"
        imageAlt="Unique Features of Beaches"
        reverse
      />
    </Section>
  </>
);

export { VerticalFeatures };
