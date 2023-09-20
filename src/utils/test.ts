type TupleToObject<T extends readonly (keyof any)[]> = {
  [Key in T[number]]: Key;
};

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

const tuple2Obj: TupleToObject<typeof tuple> = {
  tesla: "tesla",
  "model 3": "model 3",
  "model X": "model X",
  "model Y": "model Y",
};

console.log("tuple2Obj", tuple2Obj);
