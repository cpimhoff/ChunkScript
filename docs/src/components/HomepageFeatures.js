import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Easy to Use",
    Svg: require("../../static/img/easy.svg").default,
    description: (
      <>ChunkScript is so simple, it makes Haskell look complex by contrast.</>
    ),
  },
  {
    title: "Faster",
    Svg: require("../../static/img/fast.svg").default,
    description: (
      <>
        In extremely specifically chosen benchmarks, ChunkScript outperforms
        other languages, especially Haskell.
      </>
    ),
  },
  {
    title: "Fuck Haskell",
    Svg: require("../../static/img/blips.svg").default,
    description: (
      <>
        Sure, the typing system is pretty good but like{" "}
        <em>the Haskell community</em> is so annoying about it. "Monads
        represent logic as data" blah blah blah. Monads represent my butt.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
