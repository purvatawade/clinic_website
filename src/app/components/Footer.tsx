export default function Footer() {
  return (
    <footer className="bg-[#041a12] text-slate-300 text-sm border-t border-emerald-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-extrabold text-base mb-2">Dhanwantri Clinic</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Shop No 7, Priyal Enclave Building, Opposite R K Hotel, Near Bharti Park, Mira Road East, Thane – 401107.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
            OPD Timings (Open Daily)
          </h4>
          <p className="text-xs text-slate-200">Morning: 11:00 AM – 02:00 PM</p>
          <p className="text-xs text-slate-200 mt-1">Evening: 06:30 PM – 09:30 PM</p>
          <p className="text-xs text-emerald-400 mt-2 font-bold">Personalized Treatment Plans</p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
            Physician In-Charge
          </h4>
          <p className="text-xs font-bold text-white">Dr. Sarika. B. Singh</p>
          <p className="text-xs text-emerald-300">B.A.M.S. (Mumbai)</p>
          <p className="text-xs text-emerald-300">Family Physician & Surgeon</p>
        </div>
      </div>

      <div className="border-t border-emerald-950/80 py-4 text-center text-xs text-emerald-400/80">
        © 2026 Dhanwantri Clinic. All rights reserved.
      </div>
    </footer>
  );
}