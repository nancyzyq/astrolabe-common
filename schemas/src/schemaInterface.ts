import { FieldOption, FieldType, SchemaField, SchemaInterface } from "./types";
import { Control } from "@react-typed-forms/core";

export class DefaultSchemaInterface implements SchemaInterface {
  constructor(protected boolStrings: [string, string] = ["No", "Yes"]) {}

  getOptions({ options }: SchemaField): FieldOption[] | null | undefined {
    return options && options.length > 0 ? options : null;
  }
  isEmptyValue(f: SchemaField, value: any): boolean {
    if (f.collection)
      return Array.isArray(value) ? value.length === 0 : value == null;
    switch (f.type) {
      case FieldType.String:
        return !value;
      default:
        return value == null;
    }
  }
  textValue(
    field: SchemaField,
    value: any,
    element?: boolean | undefined,
  ): string | undefined {
    switch (field.type) {
      case FieldType.DateTime:
        return new Date(value).toLocaleDateString();
      case FieldType.Date:
        return new Date(value).toLocaleDateString();
      case FieldType.Bool:
        return this.boolStrings[value ? 1 : 0];
      default:
        return value != null ? value.toString() : undefined;
    }
  }
  controlLength(f: SchemaField, control: Control<any>): number {
    return f.collection
      ? control.elements?.length ?? 0
      : this.valueLength(f, control.value);
  }
  valueLength(field: SchemaField, value: any): number {
    return (value && value?.length) ?? 0;
  }
}

export const defaultSchemaInterface: SchemaInterface =
  new DefaultSchemaInterface();
