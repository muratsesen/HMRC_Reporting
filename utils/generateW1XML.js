import fs from 'fs';
import { alcoholTemplate, periodOpeningStockTemplate, adjustmentTemplate, periodClosingStockTemplate } from './templates/alcoholTemplate.js';
import {receiptTemplate, receiptWrapperTemplate} from './templates/receiptTemplate.js'
import {removalTemplate, removalsWrapperTemplate} from './templates/removalTemplate.js'
import {outstandingAADTemplate} from './templates/outstandingAADTemplate.js'
import {returnedShortageAADTemplate} from './templates/returnedShortageAADTemplate.js'
import {outstandingW8Template} from './templates/outstandingW8Template.js'
import {returnedShortageW8Template} from './templates/returnedShortageW8Template.js'
import {ceasedOwnerTemplate} from './templates/ceasedOwnerTemplate.js'

export default function generateW1XML(templateUrl= 'w1.xml',data={}){
    let template = fs.readFileSync('w1.xml', 'utf-8');
  
    let modified = template.replace(/#Username#/g, data.username)
    .replace(/#Password#/g, data.password)
    .replace(/#VendorName#/g, data.vendorName)
    .replace(/#VendorURI#/g, data.vendorUri)
    .replace(/#VendorId#/g, data.vendorId)
    .replace(/#VendorProductName#/g, data.vendorProductName)
    .replace(/#VendorProductVersion#/g, data.vendorProductVersion)
    .replace(/#warehouseID#/g, data.warehouseId)
    .replace(/#periodStartDate#/g, data.periodStartDate)
    .replace(/#periodEndDate#/g, data.periodEndDate)
    .replace(/#currencyCode#/g, data.currencyCode);
  
    if (data.products && data.products.length > 0) {
      let products = prepareProducts(data.products);
      modified = modified.replace(/<!--#Products#-->/g, products);
     }
  
     if(data.outstandingAADs && data.outstandingAADs.length > 0) {
       let outstandingAAD = prepareOutstandingAAD(data.outstandingAADs);
       modified = modified.replace(/<!--#OutstandingAADs#-->/g, outstandingAAD);
     }
     
     if(data.returnedShortageAADs && data.returnedShortageAADs.length > 0) {
       let returnedShortageAADs = prepareReturnedShortageAADs(data.returnedShortageAADs);
       modified = modified.replace(/<!--#ReturnedShortageAADs#-->/g, returnedShortageAADs);
     }
  
     if(data.outstandingW8s && data.outstandingW8s.length > 0) {
       let outstandingW8s = prepareOutstandingW8s(data.outstandingW8s);
       modified = modified.replace(/<!--#OutstandingW8s#-->/g, outstandingW8s);
     }
  
     if(data.returnedShortageW8s && data.returnedShortageW8s.length > 0) {
       let returnedShortageW8s = prepareReturnedShortageW8s(data.returnedShortageW8s);
       modified = modified.replace(/<!--#ReturnedShortageW8s#-->/g, returnedShortageW8s);
     }
  
     if(data.ceasedOwner && data.ceasedOwner.length > 0) {
       let ceasedOwners = prepareCeasedOwners(data.ceasedOwner);
       modified = modified.replace(/<!--#CeasedOwners#-->/g, ceasedOwners);
     }
  
     fs.writeFile('output.xml', modified, (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
      } else {
        console.log('File written successfully');
      }
    });
    // console.log("-----------------------------");
    // console.log(modified);
    // console.log("-----------------------------");
    return modified;
  
  }

  function prepareProducts(products) {
  

    let alcohols = '';
  
    products.forEach(product => {
      let alcohol = alcoholTemplate;
      if(product.productType) alcohol = alcohol.replace(/#productType#/g, product.productType);
      
      if(product.periodOpeningStock){
        let po = periodOpeningStockTemplate;
        if(product.periodOpeningStock.quantity.cases) po = po.replace(/#periodOpeningStockCases#/g, product.periodOpeningStock.quantity.cases);
        if(product.periodOpeningStock.quantity.casks) po = po.replace(/#periodOpeningStockCasks#/g, product.periodOpeningStock.quantity.casks);
        if(product.periodOpeningStock.quantity.litres) po = po.replace(/#periodOpeningStockLitres#/g, product.periodOpeningStock.quantity.litres.toFixed(2));
        alcohol = alcohol.replace(/<!--PeriodOpeningStock-->/g, po);
      }
      if(product.adjustment){
        let adjustment = adjustmentTemplate;
        if(product.adjustment.quantity.cases) adjustment = adjustment.replace(/#adjustmentCases#/g, product.adjustment.quantity.cases);
        if(product.adjustment.quantity.casks) adjustment = adjustment.replace(/#adjustmentCasks#/g, product.adjustment.quantity.casks);
        if(product.adjustment.quantity.litres) adjustment = adjustment.replace(/#adjustmentLitres#/g, product.adjustment.quantity.litres.toFixed(2));
        if(product.adjustment.reason) adjustment = adjustment.replace(/#adjustmentReason#/g, product.adjustment.reason);
        alcohol = alcohol.replace(/<!--Adjustment-->/g, adjustment);
      }
      if(product.periodClosingStock){
        
        let pc = periodClosingStockTemplate;
        pc = pc.replace(/#periodClosingStockCases#/g, product.periodClosingStock.quantity.cases);
        pc = pc.replace(/#periodClosingStockCasks#/g, product.periodClosingStock.quantity.casks);
        pc = pc.replace(/#periodClosingStockLitres#/g, product.periodClosingStock.quantity.litres.toFixed(2));
        alcohol = alcohol.replace(/<!--PeriodClosingStock-->/g, pc);
      }
  
  
      //Receipts
      if(product.receipts){
  
        let receiptWrapper = receiptWrapperTemplate;
        let receipts = '';
        product.receipts.forEach(receipt => {
          let receiptItem = receiptTemplate;
          receiptItem = receiptItem.replace(/#alcoholReceiptType#/g, receipt.alcoholReceiptType)
          .replace(/#cases#/g, receipt.quantity.cases)
          .replace(/#casks#/g, receipt.quantity.casks)
          .replace(/#litres#/g, receipt.quantity.litres.toFixed(2));
          receipts += receiptItem;
        })
        //console.log(receipts);
        receiptWrapper = receiptWrapper.replace(/<!--ReceipItems-->/g, receipts);
        alcohol = alcohol.replace(/<!--Receipts-->/g, receiptWrapper);
      }
  
        //Removals
        if(product.removals){
  
          let removalsWrapper = removalsWrapperTemplate;
  
          let removals = '';
  
          product.removals.forEach(removal => {
            let removalItem = removalTemplate;
            removalItem = removalItem.replace(/#alcoholRemovalType#/g, removal.alcoholRemovalType)
            .replace(/#cases#/g, removal.quantity.cases)
            .replace(/#casks#/g, removal.quantity.casks)
            .replace(/#litres#/g, removal.quantity.litres.toFixed(2));
            removals += removalItem;
          })
          
          removalsWrapper = removalsWrapper.replace(/<!--RemovalItems-->/g, removals);
          alcohol = alcohol.replace(/<!--Removals-->/g, removalsWrapper);
        }
  
        alcohols += alcohol;
    })
  
    //console.log(alcohols);
    
    return `&lt;Products&gt;${alcohols}&lt;/Products&gt;`;
  }

  function prepareOutstandingAAD(outstandingAADs) {
    let aads = '';
    outstandingAADs.forEach(aad => {
      let aadItem = outstandingAADTemplate;
      aadItem = aadItem.replace(/#referenceNumber#/g, aad.referenceNumber)
        .replace(/#dateOfDispatch#/g, aad.dateOfDispatch)
        .replace(/#duty#/g, aad.duty)
        .replace(/#destinationWarehouseCode#/g, aad.destinationWarehouseCode)
        .replace(/#ownerName#/g, aad.goodsOwner.ownerName)
        .replace(/#goodsTransporter#/g, aad.goodsTransporter)
        .replace(/#guaranteeProvider#/g, aad.guaranteeProvider);
  
      aads += aadItem;
    })
    return aads;
  }
  
  function prepareReturnedShortageAADs(returnedShortageAADs) {
    let aads = '';
    returnedShortageAADs.forEach(aad => {
      let aadItem = returnedShortageAADTemplate;
      aadItem = aadItem.replace(/#referenceNumber#/g, aad.referenceNumber)
        .replace(/#dateOfDispatch#/g, aad.dateOfDispatch)
        .replace(/#duty#/g, aad.duty)
        .replace(/#destinationWarehouseCode#/g, aad.destinationWarehouseCode)
        .replace(/#ownerName#/g, aad.goodsOwner.ownerName)
        .replace(/#goodsTransporter#/g, aad.goodsTransporter)
        .replace(/#guaranteeProvider#/g, aad.guaranteeProvider)
        .replace(/#comments#/g, aad.comments);
  
      aads += aadItem;
    })
    return aads;
  }
  
  function prepareOutstandingW8s(outstandingW8s) {
    let w8s = '';
    outstandingW8s.forEach(w8 => {
      let w8Item = outstandingW8Template;
      w8Item = w8Item.replace(/#referenceNumber#/g, w8.referenceNumber)
        .replace(/#dateOfDispatch#/g, w8.dateOfDispatch)
        .replace(/#duty#/g, w8.duty)
        .replace(/#destinationWarehouseCode#/g, w8.destinationWarehouseCode)
        .replace(/#ownerName#/g, w8.goodsOwner.ownerName)
        .replace(/#goodsTransporter#/g, w8.goodsTransporter)
        .replace(/#guaranteeProvider#/g, w8.guaranteeProvider);
  
      w8s += w8Item;
    })
    return w8s;
  }
  
  function prepareReturnedShortageW8s(returnedShortageW8s) {
    let w8s = '';
    returnedShortageW8s.forEach(w8 => {
      let w8Item = returnedShortageW8Template;
      w8Item = w8Item.replace(/#referenceNumber#/g, w8.referenceNumber)
        .replace(/#dateOfDispatch#/g, w8.dateOfDispatch)
        .replace(/#duty#/g, w8.duty)
        .replace(/#destinationWarehouseCode#/g, w8.destinationWarehouseCode)
        .replace(/#ownerName#/g, w8.goodsOwner.ownerName)
        .replace(/#goodsTransporter#/g, w8.goodsTransporter)
        .replace(/#guaranteeProvider#/g, w8.guaranteeProvider)
        .replace(/#comments#/g, w8.comments);
  
      w8s += w8Item;
    })
    return w8s;
  }
  
  function prepareCeasedOwners(ceasedOwner) {
    let owners = '';
    ceasedOwner.forEach(owner => {
      let ownerItem = ceasedOwnerTemplate;
      ownerItem = ownerItem.replace(/#newOwner#/g, owner.newOwner)
        .replace(/#ceasedOwner#/g, owner.ceasedOwner);
  
      owners += ownerItem;
    })
    return owners;
  }