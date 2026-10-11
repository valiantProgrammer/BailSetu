import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";

dotenv.config({ path: ".env.local" });
const { getCollection } = await import("../lib/mongo.js");

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const csvPath = path.join(scriptDirectory, "..", "ipc_sections.csv");

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];

    if (character === '"') {
      if (quoted && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && input[index + 1] === "\n") {
        index += 1;
      }
      row.push(field);
      if (row.some((value) => value !== "")) {
        rows.push(row);
      }
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    if (row.some((value) => value !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

function requiredBoolean(value, fieldName, rowNumber) {
  if (value !== "true" && value !== "false") {
    throw new Error(`Row ${rowNumber}: ${fieldName} must be true or false`);
  }
  return value === "true";
}

const rows = parseCsv(fs.readFileSync(csvPath, "utf8"));
const [headers, ...dataRows] = rows;
const expectedHeaders = [
  "_id",
  "section_number",
  "sub_section",
  "title",
  "description",
  "bailable",
  "cognizable",
  "punishment",
  "court_level",
  "category",
  "tags[0]",
  "tags[1]",
  "tags[2]",
  "tags[3]",
  "tags[4]",
  "source_link",
  "bail_type",
  "bail_applicable",
  "bail_time_limit",
];

if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
  throw new Error("CSV headers do not match the expected ipc_sections schema");
}

const documents = dataRows.map((values, index) => {
  const rowNumber = index + 2;
  if (values.length !== expectedHeaders.length) {
    throw new Error(
      `Row ${rowNumber}: expected ${expectedHeaders.length} fields, received ${values.length}`,
    );
  }

  const [
    id,
    sectionNumber,
    subSection,
    title,
    description,
    bailable,
    cognizable,
    punishment,
    courtLevel,
    category,
    ...remaining
  ] = values;
  const tags = remaining.slice(0, 5).filter(Boolean);
  const [sourceLink, bailType, bailApplicable, bailTimeLimit] =
    remaining.slice(5);

  if (!ObjectId.isValid(id)) {
    throw new Error(`Row ${rowNumber}: invalid MongoDB ObjectId "${id}"`);
  }

  return {
    _id: new ObjectId(id),
    section_number: sectionNumber,
    sub_section: subSection,
    title,
    description,
    bailable: requiredBoolean(bailable, "bailable", rowNumber),
    cognizable: requiredBoolean(cognizable, "cognizable", rowNumber),
    punishment,
    court_level: courtLevel,
    category,
    tags,
    source_link: sourceLink,
    bail_type: bailType,
    bail_applicable: requiredBoolean(
      bailApplicable,
      "bail_applicable",
      rowNumber,
    ),
    bail_time_limit: bailTimeLimit,
  };
});

const collection = await getCollection();
const result = await collection.bulkWrite(
  documents.map((document) => ({
    replaceOne: {
      filter: { _id: document._id },
      replacement: document,
      upsert: true,
    },
  })),
  { ordered: true },
);

console.log(
  JSON.stringify({
    sourceRows: documents.length,
    inserted: result.upsertedCount,
    updated: result.modifiedCount,
    matched: result.matchedCount,
    collectionCount: await collection.countDocuments(),
  }),
);
process.exit(0);
