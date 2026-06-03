const SectionHeader = ({ title, subTitle }) => (
  <div className="section-header">
    {subTitle && <p className="section-subtitle">{subTitle}</p>}
    <h2>{title}</h2>
  </div>
);

export default SectionHeader;
