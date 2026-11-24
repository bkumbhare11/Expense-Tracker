function PageHeader({ title, subtitle }) {
  return (
    <header className="mb-5">
      <h1 className="font-black text-2xl md:text-4xl">{title}</h1>
      <p className="font-semibold text-sm md:text-md">{subtitle}</p>
    </header>
  );
}

export default PageHeader;
