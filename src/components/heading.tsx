"use client";


interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}
const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h3 className="text-2xl font-semibold text-neutral-900">{title}</h3>
      <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default Heading;
