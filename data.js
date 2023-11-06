export const data = {
    username: "ATWDTrader01",
    password: "fGuR34fAOEJf",
    vendorName: "Metacask",
    vendorUri: "metacask.com",
    vendorId: "123123",
    vendorProductName: "trackr",
    vendorProductVersion: "1.0",
    warehouseId: "GB00000000002",
    periodStartDate: "2008-10-01",
    periodEndDate: "2008-10-31",
    currencyCode: "GBP",
    products: [
        {
            productType: "whisky",
            periodOpeningStock: {
                quantity: {
                    cases: 10,
                    casks: 10,
                    litres: 1.0,
                }
            },
            // adjustment: {
            //     quantity: {
            //         cases: 0,
            //         casks: 0,
            //         litres: -0.28
            //     },
            //     reason :"adjustment reason"
            // },
            // receipts: [
            //     {
            //         alcoholReceiptType: "receiptsFromImportation",
            //         quantity: {
            //             cases: 0,
            //             casks: 0,
            //             litres: 2.0
            //         }
            //     },
            //     {
            //         alcoholReceiptType: "receiptsFromEU",
            //         quantity: {
            //             cases: 0,
            //             casks: 0,
            //             litres: 1.0
            //         }
            //     }
            // ],
            removals: [
                {
                    alcoholRemovalType: "removalsToHomeUse",
                    quantity: {
                        cases: 0,
                        casks: 0,
                        litres: 1.0
                    }
                },
                {
                    alcoholRemovalType: "removalsToExportation",
                    quantity: {
                        cases: 0,
                        casks: 0,
                        litres: 1.0
                    }
                }
            ],
            periodClosingStock: {
                quantity: {
                    cases: 0,
                    casks: 0,
                    litres: 0
                }
            }
        }

    ],
    // outstandingAADs: [
    //     {
    //         referenceNumber: "12345",
    //         dateOfDispatch: "2007-01-08",
    //         duty: "3.14",
    //         destinationWarehouseCode: "XXXXXXXXX",
    //         goodsOwner: {
    //             ownerName: "John Smith"
    //         },
    //         goodsTransporter: "Jack Jones",
    //         guaranteeProvider: "owner",
    //     }
    // ],
    // returnedShortageAADs: [
    //     {
    //         referenceNumber: "12345",
    //         dateOfDispatch: "2007-01-08",
    //         duty: "3.14",
    //         destinationWarehouseCode: "XXXXXXXXX",
    //         goodsOwner: {
    //             ownerName: "John Smith"
    //         },
    //         goodsTransporter: "Jack Jones",
    //         guaranteeProvider: "owner",
    //         comments: "Some comments"
    //     }
    // ],
    // outstandingW8s: [
    //     {
    //         referenceNumber: 573463535,
    //         dateOfDispatch: "1967 -08 - 13",
    //         duty: 3.14,
    //         destinationWarehouseCode: "GB00000000000",
    //         goodsOwner: {
    //             ownerName: "John Smith",
    //         },
    //         goodsTransporter: "XXXXXX",
    //         guaranteeProvider: "XXXXXXownerXXXX",
    //     }
    // ],
    // returnedShortageW8s: [
    //     {
    //         referenceNumber: 573463535,
    //         dateOfDispatch: "1967-08-13",
    //         duty: 3.14,
    //         destinationWarehouseCode: "GB00000000000",
    //         goodsOwner: {
    //             ownerName: "John Smith",
    //         },
    //         goodsTransporter: "String",
    //         guaranteeProvider: "owner",
    //         comments: "Some comments"
    //     }
    // ],
    // ceasedOwner: [
    //     {
    //         newOwner: "GBOG999251363",
    //         ceasedOwner: "GBOG999113966"
    //     }
    // ]
}