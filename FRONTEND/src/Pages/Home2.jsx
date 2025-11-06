import { HospitalDashBoardCardComponent } from "../Components/HospitalDashBoardCardComponent";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import GameStats from "../GameStats";  // ✅ Import Firebase data component

export function Home2() {
  return (
    <>
      <Navbar />
      <HospitalDashBoardCardComponent />

      {/* ✅ Firebase data display section */}
      <div className="mt-10 px-6">
        <GameStats />
      </div>

      <Footer />
    </>
  );
}
