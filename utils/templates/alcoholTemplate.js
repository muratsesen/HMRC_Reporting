
export const alcoholTemplate = `
        &lt;Alcohol&gt;
            &lt;productType&gt;#productType#&lt;/productType&gt;
            <!--PeriodOpeningStock-->
            <!--Adjustment-->
            <!--Receipts-->
            <!--Removals-->
            <!--PeriodClosingStock-->
        &lt;/Alcohol&gt;
`

export const periodOpeningStockTemplate = `
            &lt;PeriodOpeningStock&gt;
                &lt;Quantity&gt;
                    &lt;cases&gt;#periodOpeningStockCases#&lt;/cases&gt;
                    &lt;casks&gt;#periodOpeningStockCasks#&lt;/casks&gt;
                    &lt;litres&gt;#periodOpeningStockLitres#&lt;/litres&gt;
                &lt;/Quantity&gt;
            &lt;/PeriodOpeningStock&gt;
`
export const adjustmentTemplate = `
            &lt;Adjustment&gt;
            &lt;Quantity&gt;
                &lt;cases&gt;#adjustmentCases#&lt;/cases&gt;
                &lt;casks&gt;#adjustmentCasks#&lt;/casks&gt;
                &lt;litres&gt;#adjustmentLitres#&lt;/litres&gt;
            &lt;/Quantity&gt;
            &lt;adjustmentReason&gt;#adjustmentReason#&lt;/adjustmentReason&gt;
            &lt;/Adjustment&gt;
`
export const periodClosingStockTemplate=`
            &lt;PeriodClosingStock&gt;
                &lt;Quantity&gt;
                    &lt;cases&gt;#periodClosingStockCases#&lt;/cases&gt;
                    &lt;casks&gt;#periodClosingStockCasks#&lt;/casks&gt;
                    &lt;litres&gt;#periodClosingStockLitres#&lt;/litres&gt;
                &lt;/Quantity&gt;
            &lt;/PeriodClosingStock&gt;
`