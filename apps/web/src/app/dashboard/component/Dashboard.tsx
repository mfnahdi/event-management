import CardFour from './CardFour';
import CardOne from './CardOne';
import CardThree from './CardThree';
import CardTwo from './CardTwo';
import ChartOne from './ChartOne';
import ChartTwo from './ChartTwo';
import SidebarPromoter from './SidebarDashboard';

const PromoterDashboard = () => {
  return (
    <section className="flex w-full ">
      <SidebarPromoter activeLink={'dashboard'} />
      <div className="flex flex-col w-full">
        <div>
          <CardOne />
        </div>
        <div>
          <CardTwo />
        </div>
        <div>
          <CardThree />
        </div>

        <div>
          <CardFour />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <ChartOne />
      </div>
      <div className="flex flex-col w-full">
        <ChartTwo />
      </div>
    </section>
  );
};

export default PromoterDashboard;
