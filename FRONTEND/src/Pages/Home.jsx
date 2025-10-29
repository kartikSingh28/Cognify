import { Navbar } from "../components/Navbar";
import { HeroCard } from "../Components/HeroCardComponent";
import { Footer } from "../Components/Footer";
import {HeroInfoCard} from "../Components/HeroInfo";
import {HeroInfo2} from "../Components/HeroInfo2";


export function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
    
      <main className="flex-grow pb-60">
        <HeroCard />
        <HeroInfoCard />
        <HeroInfo2 />
      </main>
      <Footer />
    </div>
  );
}
