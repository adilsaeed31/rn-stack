// @flow
import * as React from "react";

// type assignment
import type MovieTypes from "../Types";

type Props = {
  item: MovieTypes
};

export default function InfoRow({ item, index }: Props) {
  return (
    <div className="column is-one-third-desktop is-half-mobile is-half-tablet has-text-centered">
      <figure className="image is-4by5">
        {item.poster === "N/A" ? (
          <img src="/images/no-poster.jpg" alt={item.title || "No Title"} />
        ) : (
          <img src={item.poster} alt={item.title} />
        )}
      </figure>
      <h2>
        <strong>{item.title}</strong>
      </h2>
    </div>
  );
}
