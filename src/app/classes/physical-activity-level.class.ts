export class PhysicalActivityLevel {

  readonly id: number;
  readonly name: string;
  readonly coefficient: number;

  constructor(id: number, name: string, coefficient: number) {
    this.id = id;
    this.name = name;
    this.coefficient = coefficient;
  }

}
