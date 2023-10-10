import { expect, it, describe } from "vitest";
import { getPages, getTotalPages, verifyHasNext, verifyHasPrev, getQueryCount, groupByDate, groupByRocketName } from "./controllers";

describe("Verification functions", () => {
    it("returns the number of current pages", () => {
        const res = getPages(5, 5)
        expect(res).eq(2);
    })

    it("returns the number of total pages", () => {
        const res = getTotalPages(30, 5)
        expect(res).eq(6);
    })

    it("returns to if there is a previous page", () => {
        const res = verifyHasPrev(5)
        expect(res).to.be.true;
    })

    it("return to if there is next page", () => {
        const res = verifyHasNext(6, 6)
        expect(res).to.be.false;
    })
})

describe('Tests for getQueryCount', () => {
    it('Should return an object with the property success as true when the argument is true', () => {
        const result = getQueryCount(true);
        expect(result).to.deep.equal({ success: true });
    });

    it('Should return an object with the property success as false when the argument is false', () => {
        const result = getQueryCount(false);
        expect(result).to.deep.equal({ success: false });
    });
});


describe('Tests for groupByDate', () => {
    it('Should return an array with a group aggregation object', () => {
        const result = groupByDate();

        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(1);

        const aggregationObject = result[0];
        expect(aggregationObject).to.be.an('object');
        expect(aggregationObject).to.have.property('$group');

        const groupStage = aggregationObject.$group;
        expect(groupStage).to.be.an('object');
        expect(groupStage).to.have.property('_id');
        expect(groupStage._id).to.be.an('object');
        expect(groupStage._id).to.have.property('year');
        expect(groupStage._id).to.have.property('name');
        expect(groupStage).to.have.property('count');
    });
});

describe('Tests for groupByRocketName', () => {
    it('Should return an array with a group aggregation object', () => {
      const result = groupByRocketName();
  
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
  
      const aggregationObject = result[0];
      expect(aggregationObject).to.be.an('object');
      expect(aggregationObject).to.have.property('$group');
  
      const groupStage = aggregationObject.$group;
      expect(groupStage).to.be.an('object');
      expect(groupStage).to.have.property('_id');
      expect(groupStage).to.have.property('count');
    });
  });