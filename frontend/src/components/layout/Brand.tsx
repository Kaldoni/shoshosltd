import { company } from '@/data/company';
export default function Brand() {
  return (
    <>
      <img src="/logo.png" alt={company.name} className="logo-icon" />
      <span className="logo-text">
        <strong>shoshos</strong>
        <span className="logo-red">Oil and Gas Intl. Limited</span>
      </span>
    </>
  );
}
