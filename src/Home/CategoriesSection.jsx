import React from 'react';


const CategoriesSection = () => {
  const categories = [
    {
      title: 'Wires & Cables',
      description:
        'Premium copper conductors, THHN, Romex, and specialty cables',
      image:
        'https://readdy.ai/api/search-image?query=high%20quality%20electrical%20wires%20and%20cables%20copper%20conductors%20various%20gauges%20organized%20display%20professional%20electrical%20supplies%20clean%20white%20background%20industrial%20grade&width=400&height=300&seq=wires-cables&orientation=landscape',
    },
    {
      title: 'Safety Equipment',
      description:
        'Hard hats, insulated gloves, voltage testers, and lockout devices',
      image:
        'https://readdy.ai/api/search-image?query=electrical%20safety%20equipment%20hard%20hats%20safety%20glasses%20insulated%20gloves%20voltage%20testers%20lockout%20tagout%20devices%20professional%20safety%20gear%20clean%20white%20background&width=400&height=300&seq=safety-equipment&orientation=landscape',
    },
    {
      title: 'Testing Instruments',
      description:
        'Digital multimeters, oscilloscopes, and circuit analyzers',
      image:
        'https://readdy.ai/api/search-image?query=professional%20electrical%20testing%20instruments%20digital%20multimeters%20oscilloscopes%20circuit%20analyzers%20voltage%20meters%20professional%20grade%20equipment%20clean%20white%20background&width=400&height=300&seq=testing-instruments&orientation=landscape',
    },
    {
      title: 'Power Tools',
      description:
        'Drill drivers, impact wrenches, and specialized electrical tools',
      image:
        'https://readdy.ai/api/search-image?query=professional%20power%20tools%20drill%20drivers%20impact%20wrenches%20wire%20strippers%20electrical%20hand%20tools%20organized%20display%20industrial%20grade%20clean%20white%20background&width=400&height=300&seq=power-tools&orientation=landscape',
    },
    {
      title: 'Lighting Solutions',
      description:
        'LED fixtures, smart lighting, and energy-efficient solutions',
      image:
        'https://readdy.ai/api/search-image?query=modern%20LED%20lighting%20solutions%20commercial%20fixtures%20residential%20lights%20smart%20lighting%20systems%20energy%20efficient%20bulbs%20clean%20white%20background%20professional%20display&width=400&height=300&seq=lighting-solutions&orientation=landscape',
    },
    {
      title: 'Switches & Outlets',
      description:
        'GFCI outlets, smart switches, and commercial-grade panels',
      image:
        'https://readdy.ai/api/search-image?query=electrical%20switches%20outlets%20circuit%20breakers%20panels%20electrical%20components%20organized%20display%20professional%20grade%20industrial%20supplies%20clean%20white%20background&width=400&height=300&seq=switches-outlets&orientation=landscape',
    },
  ];

  return (
    <section className="bg-light">
      <div className="p-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6 text-dark mb-3">
            Professional Electrical Categories
          </h2>
          <p className="lead text-secondary">
            Everything you need for electrical installations and maintenance
          </p>
        </div>

        <div className="row g-4">
          {categories.map((category, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-lg border-0 " style={{borderRadius:'20px'}}>
                <div
                  className="bg-image"
                  style={{
                    height:'14rem',
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // height: '200px',
                     borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px'
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title fw-semibold mb-2">{category.title}</h5>
                  <p className="card-text text-muted mb-3">
                    {category.description}
                  </p>
                  <a href="#!" className="text-primary fw-semibold text-decoration-none">
                    Shop Now →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
