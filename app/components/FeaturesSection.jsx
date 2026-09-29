"use client";

const features = [
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#0B1B34]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
      </svg>
    ),
    title: "Space Saving",
    subtitle: "Up to 80% more space",
  },
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#0B1B34]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
    title: "Airtight & Waterproof",
    subtitle: "Protects from moisture, dust & odors",
  },
  {
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#0B1B34]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Reusable Protection",
    subtitle: "Long lasting & durable",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white border-y border-gray-200 py-8 sm:py-10 lg:py-12 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-start sm:justify-center gap-4 sm:gap-6 ${
                index === 0
                  ? "pb-6 md:pb-0 md:pr-8"
                  : index === 1
                  ? "py-6 md:py-0 md:px-8"
                  : "pt-6 md:pt-0 md:pl-8"
              }`}
            >
              {/* Circular Double-Ring Icon Container */}
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-[#0B1B34]/20 p-1 sm:p-1.5 flex items-center justify-center flex-shrink-0 bg-white shadow-xs">
                <div className="w-full h-full rounded-full border border-[#C59B3F]/60 flex items-center justify-center bg-gray-50/80">
                  {item.icon}
                </div>
              </div>

              {/* Text content centered properly with the icon */}
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-[#0B1B34] text-base sm:text-lg lg:text-xl leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
