'use strict';

const client = require("../lib/client");

describe("client", () => {
    test("new client should create a new object", () => {
        const yieldloveClient = new client({key: process.env.KEY});

        expect(yieldloveClient.key).toEqual(process.env.KEY);
    });

    test("should throw error if provided without key", () => {
        expect(() => new client({})).toThrowError("You have to provide api key.");
    });

    test("invalid start date should return error", async () => {
        const yieldloveClient = new client({key: process.env.KEY});

        await yieldloveClient.getData("invalid", "2018-10-01")
            .catch(e => {
                console.log(e);
                expect(e).toMatchObject(Error("Start date is invalid."))
            })
    });

    test("invalid end date should return error", async () => {
        const yieldloveClient = new client({key: process.env.KEY});

        await yieldloveClient.getData("2018-10-01", "invalid")
            .catch(e => {
                console.log(e);
                expect(e).toMatchObject(Error("End date is invalid."))
            })
    });

    test("should return filled data", async () => {
        const yieldloveClient = new client({key: process.env.KEY});

        const res = await yieldloveClient.getData("2018-10-01", "2018-10-01");

        expect(res).toMatchSnapshot();
    });

    test("should return empty data", async () => {
        const yieldloveClient = new client({key: process.env.KEY});

        const res = await yieldloveClient.getData("2000-10-01", "2000-10-01");

        expect(res).toMatchSnapshot();
    });
});