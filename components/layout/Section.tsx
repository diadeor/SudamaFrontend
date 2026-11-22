import { ArrowRight, Subtitles } from "lucide-react";
import { ReactNode } from "react";

interface Section {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  linkText?: string;
  className?: string;
  link?: string;
}

const Section = ({ title, subTitle, children, linkText, className, link }: Section) => {
  const firstRowDisabled = !title && !subTitle && !linkText ? true : false;
  return (
    <section className={`py-10 bg-surface-container-low ${className} w-full`}>
      <div className="max-w-304 mx-auto w-full">
        {!firstRowDisabled && (
          <div className="flex flex-row justify-between items-end mb-10">
            <div>
              {subTitle && (
                <span className="text-primary text-[0.65rem] md:text-sm font-bold uppercase tracking-widest">
                  {subTitle}
                </span>
              )}
              {title && (
                <h2 className="text-xl md:text-2xl font-label font-bold tracking-tight text-primary">
                  {title}
                </h2>
              )}
            </div>
            {linkText && (
              <a
                className="text-primary text-sm font-bold border-b border-primary flex items-center gap-1 hover:opacity-70"
                href={link ? link : ""}
              >
                <span className="leading-8">{linkText}</span>
                <ArrowRight />
              </a>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
