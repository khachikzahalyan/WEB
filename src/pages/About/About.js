import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>Մեր մասին</h1>

      <section>
        <h2>Մեր առաքելությունը</h2>
        <p>
          Մեր հարթակը ստեղծվել է՝ նպատակ ունենալով աջակցել կրթական գործընթացների թվայնացմանը և ուսուցիչ-աշակերտ համագործակցության բարելավմանը։
        </p>
      </section>

      <section>
        <h2>Մեր թիմը</h2>
        <p>
          Մենք մի խումբ ծրագրավորողներ, դիզայներներ և մանկավարժներ ենք, ովքեր հավատում են, որ կրթությունը կարող է լինել արդյունավետ, արդիական և հարմարավետ։
        </p>
      </section>

      <section>
        <h2>Մեր պատմությունը</h2>
        <p>
          Նախագիծը սկսվել է 2024 թվականին՝ որպես փոքր նախաձեռնություն, որն այսօր վերածվել է կրթական լիարժեք հարթակի՝ հազարավոր օգտվողներով։
        </p>
      </section>

      <section>
        <h2>Արժեքները</h2>
        <ul>
          <li>Թափանցիկություն և պատասխանատվություն</li>
          <li>Կիրառելիություն և հարմարավետություն</li>
          <li>Մշտական զարգացում և նորարարություն</li>
        </ul>
      </section>

      <section>
        <h2>Կապ մեզ հետ</h2>
        <p>
          Հարցերի, առաջարկների կամ համագործակցության համար կարող եք գրել մեզ
          <a href="/contact"> այստեղից</a>։
        </p>
      </section>
    </div>
  );
}
