// @flow
import * as React from "react";

// type assignment
import type MovieTypes from "../Types";

type Props = {
  item: MovieTypes
};

export default function InfoRow({ item }: Props) {
  return (
    <div className="column has-text-centered">
      <img src={item.poster} alt={item.title} />
      <h2>{item.title}</h2>
    </div>
  );
}
