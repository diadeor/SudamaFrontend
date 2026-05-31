import { ArrowRight, Subtitles } from "lucide-react";
import { ReactNode } from "react";

interface Section {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  linkText?: string;
  className?: string;
}

const Section = ({ title, subTitle, children, linkText, className }: Section) => {
  const firstRowDisabled = !title && !subTitle && !linkText ? true : false;
  return (
    <section className={` py-10 bg-surface-container-low ${className} w-full`}>
      <div className="max-w-7xl mx-auto w-full">
        {!firstRowDisabled && (
          <div className="flex flex-row justify-between mb-10 items-center">
            <div>
              {subTitle && (
                <span className="text-primary text-[0.7rem] font-bold uppercase tracking-widest">
                  {subTitle}
                </span>
              )}
              {title && (
                <h2 className="text-[1.5rem] font-bold tracking-tight text-primary">{title}</h2>
              )}
            </div>
            {linkText && (
              <a
                className="text-primary font-bold border-b border-primary flex items-center gap-1 hover:opacity-70"
                href="#"
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
