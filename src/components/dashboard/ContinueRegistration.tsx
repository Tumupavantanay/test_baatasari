import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { continueItem } from '@/data/dashboardData';
import SectionHeader from './SectionHeader';

export default function ContinueRegistration() {
  const progressPercent = (continueItem.currentStep / continueItem.totalSteps) * 100;

  return (
    <div>
      <SectionHeader title="Continue Where You Left Off" />
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 hover:shadow-md hover:border-[#A1BCE6] transition-all duration-200">
        <div className="flex items-center gap-3">
          {/* Event Image thumbnail */}
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={continueItem.image}
              alt={continueItem.eventTitle}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#0C1E3C] truncate">{continueItem.eventTitle}</p>
            <p className="text-xs text-[#828894] mb-2">{continueItem.organizer}</p>

            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#F8F6F0] rounded-full overflow-hidden border border-[#E5E7EB]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#A1BCE6] to-[#0C1E3C] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                  role="progressbar"
                  aria-valuenow={continueItem.currentStep}
                  aria-valuemin={1}
                  aria-valuemax={continueItem.totalSteps}
                  aria-label={`Registration progress: step ${continueItem.currentStep} of ${continueItem.totalSteps}`}
                />
              </div>
              <span className="text-[10px] font-semibold text-[#828894] whitespace-nowrap">
                Step {continueItem.currentStep} of {continueItem.totalSteps}
              </span>
            </div>
            <p className="text-[10px] text-[#828894] mt-1">{continueItem.stepLabel}</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={continueItem.link}
          aria-label={`Continue registration for ${continueItem.eventTitle}`}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-95 shadow-md shadow-amber-900/20"
        >
          Continue Registration
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
