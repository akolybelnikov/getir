const { Record } = require("../../../src/models/record.model");
const { recordController } = require("../../../src/controllers");

describe("Record model", () => {
  describe("Records aggregation", () => {
    test("should correctly aggregate records by counts", async () => {
      await expect(recordController.getRecords({
        query: {
          startDate: "02.03.2015",
          endDate: "05.06.2021",
          minCount: 3000,
          maxCount: 3444
        }
      }));
    )
    });
  });
});
