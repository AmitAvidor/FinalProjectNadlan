const express = require("express");
const superagent = require("superagent");
const router = express.Router();

const Building = require("../db/models/building");

router.get("/", async (req, res) => {
  try {
    var buildings = await Building.find();

    res.status(200).json(buildings);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/job", async (req, res) => {
  var index = 1;
  var lastPage = false;
  try {
    while (lastPage == false) {
      URL = "https://www.nadlan.gov.il/Nadlan.REST/Main/GetAssestAndDeals";
      myobj = {
        Alert: "null",
        CurrentLavel: 2,
        DescLayerID: "SETL_MID_POINT",
        Distance: 0,
        FillterRoomNum: 0,
        GridDisplayType: 0,
        Gush: "",
        MoreAssestsType: 0,
        MutipuleResults: "false",
        Navs: [],
        ObjectID: "8700",
        ObjectIDType: "text",
        ObjectKey: "UNIQ_ID",
        OrderByDescending: "true",
        OrderByFilled: "DEALDATETIME",
        OriginalSearchString: "רעננה",
        PageNo: index,
        Parcel: "",
        QueryMapParams: {
          QueryToRun: "null",
          QueryObjectID: "8700",
          QueryObjectType: "number",
          QueryObjectKey: "SETL_CODE",
          QueryObjectType: "number",
          QueryToRun: "null",
          SpacialWhereClause: "null",
        },
        ResultLable: "רעננה",
        ResultType: 1,
        ResultsOptions: "null",
        X: 187858.75532654,
        Y: 677141.3452939,
        isHistorical: "false",
        showLotAddress: "false",
        showLotParcel: "false",
      };
      try {
        let response = await superagent.post(URL, myobj);
        if (response.status === 200) {
          response.body.AllResults.forEach((element) => {
            let building = new Building({
              deal_date: element.DEALDATE,
              full_address: element.FULLADRESS,
              city: myobj.OriginalSearchString,
              gush: element.GUSH,
              floor_num: element.FLOORNO,
              room_num: element.ASSETROOMNUM,
              deal_amount: element.DEALAMOUNT,
              building_year: element.BUILDINGYEAR,
              buidling_floors: element.BUILDINGFLOORS,
              deal_nature_description: element.DEALNATUREDESCRIPTION,
            });

            building.save();
          });
          console.log(`PageNo.${index} persisted`);
          lastPage = response.body.IsLastPage;
        } else {
          console.log(`PageNo.${index} not persisted`);
        }
      } catch {
        console.log(`PageNo.${index} not persisted`);
      }
      index += 1;
    }
    res.status(201).json({ "PageNo.": index - 1, IsLastPage: lastPage });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
