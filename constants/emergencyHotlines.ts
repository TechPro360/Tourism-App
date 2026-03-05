export interface HotlineEntry {
  municipality: string;
  cdrrmo: string;
  bfp: string;
  pnp: string;
  rhuAmbulance: string;
}

export interface HotlineDistrict {
  name: string;
  entries: HotlineEntry[];
}

export const emergencyHotlines: HotlineDistrict[] = [
  {
    name: "District I",
    entries: [
      {
        municipality: "Aliaga",
        cdrrmo: "0997-740-3799",
        bfp: "0923-482-4411\n0936-654-2366",
        pnp: "0953-234-6222\n0998-598-5404",
        rhuAmbulance: "0918-911-2342\nAmbulance: 0928-515-8919",
      },
      {
        municipality: "Cuyapo",
        cdrrmo: "0977-663-8094",
        bfp: "0922-236-6719",
        pnp: "0927-961-3417",
        rhuAmbulance: "Ambulance: 0977-607-1716",
      },
      {
        municipality: "Guimba",
        cdrrmo: "0946-404-6046\n0927-563-3451",
        bfp: "0942-554-4980\n0906-890-2940",
        pnp: "0998-598-5407",
        rhuAmbulance: "0915-061-8045\n0945-756-2223\n0917-648-0709\n0991-375-9041\n0922-522-2559",
      },
      {
        municipality: "Licab",
        cdrrmo: "0995-431-9605\n0951-692-4595",
        bfp: "0942-455-4940",
        pnp: "0917-123-2884\n0998-598-5408",
        rhuAmbulance: "0963-054-1266\n0917-193-",
      },
      {
        municipality: "Nampicuan",
        cdrrmo: "0966-987-3679\n0961-481-1704",
        bfp: "0950-587-6050",
        pnp: "0998-598-5409",
        rhuAmbulance: "RHU: 0942-353-1456\n0917-525-4047\nAmbulance: 0936-900-5598\n0950-418-8340\n0995-033-6447\n0926-756-7284",
      },
      {
        municipality: "Quezon",
        cdrrmo: "0946-414-0451",
        bfp: "0933-483-3560",
        pnp: "0998-598-5410",
        rhuAmbulance: "0917-162-8288\n0923-893-9213",
      },
      {
        municipality: "Sto. Domingo",
        cdrrmo: "0967-271-1143\n0942-253-7303",
        bfp: "0923-163-3087\n0916-633-3465\n0975-666-6436",
        pnp: "0998-598-5411\n0919-264-1213",
        rhuAmbulance: "0917-456-7649\n0926-806-3536\n0917-431-1992",
      },
      {
        municipality: "Talavera",
        cdrrmo: "0915-568-6067\n0953-509-3193\n0955-891-8793",
        bfp: "0932-467-5515",
        pnp: "0998-598-5412\n0953-665-8826",
        rhuAmbulance: "0917-159-7199",
      },
      {
        municipality: "Zaragosa",
        cdrrmo: "0915-900-7411\n0928-869-3196",
        bfp: "0942-465-6259",
        pnp: "0998-598-5413",
        rhuAmbulance: "0999-411-2716",
      },
    ],
  },
  {
    name: "District II",
    entries: [
      {
        municipality: "Carranglan",
        cdrrmo: "0945-244-4631",
        bfp: "0933-645-4155",
        pnp: "0998-598-5414",
        rhuAmbulance: "0962-622-5539\nCarranglan Medicare & Community Hospital: 0993-157-9295 / 0970-170-9906",
      },
      {
        municipality: "Llanera",
        cdrrmo: "0991-399-7282",
        bfp: "0915-342-3773\n0922-364-0030",
        pnp: "0998-598-5415\n0945-356-0704",
        rhuAmbulance: "0965-227-3707\n0936-206-7530",
      },
      {
        municipality: "Lupao",
        cdrrmo: "0917-770-1028",
        bfp: "0943-560-8116",
        pnp: "0906-550-5374",
        rhuAmbulance: "0917-133-4856",
      },
      {
        municipality: "Science City of Muñoz",
        cdrrmo: "0966-774-6951\n0912-846-6896",
        bfp: "0922-735-9848\n0977-776-9802",
        pnp: "0915-599-1424",
        rhuAmbulance: "Hospital: (044) 940-6886",
      },
      {
        municipality: "Pantabangan",
        cdrrmo: "0997-981-8840\n0915-490-6956",
        bfp: "0917-124-2772",
        pnp: "0998-598-5419",
        rhuAmbulance: "(044) 940-9184",
      },
      {
        municipality: "Rizal",
        cdrrmo: "0975-930-0039",
        bfp: "0932-606-5772",
        pnp: "0998-598-5420",
        rhuAmbulance: "Ambulance: 0917-104-0400\n(044) 604-8897",
      },
      {
        municipality: "San Jose City",
        cdrrmo: "0915-168-9878",
        bfp: "0925-453-0777",
        pnp: "0927-737-4416\n0933-852-4307",
        rhuAmbulance: "City Hospital: (044) 456-6671",
      },
      {
        municipality: "Talugtug",
        cdrrmo: "0929-257-5550\n0956-673-3441",
        bfp: "0975-092-3998\n0943-302-0684",
        pnp: "0998-598-5423",
        rhuAmbulance: "0997-097-3018\n(044) 463-4336",
      },
    ],
  },
  {
    name: "District III",
    entries: [
      {
        municipality: "Bongabon",
        cdrrmo: "0952-562-0223",
        bfp: "0948-589-3392",
        pnp: "0927-997-3805",
        rhuAmbulance: "0961-471-5021\nAmbulance: 0915-764-2460",
      },
      {
        municipality: "Cabanatuan City",
        cdrrmo: "0908-881-1010\n0917-851-1320",
        bfp: "0943-352-3733",
        pnp: "0920-611-2000\n0927-843-6905",
        rhuAmbulance: "",
      },
      {
        municipality: "Gabaldon",
        cdrrmo: "0907-073-4444",
        bfp: "0942-715-2383",
        pnp: "0998-598-5427",
        rhuAmbulance: "0977-843-2376",
      },
      {
        municipality: "Gen. Natividad",
        cdrrmo: "0917-700-1664",
        bfp: "0932-500-7911",
        pnp: "0998-598-5428",
        rhuAmbulance: "0961-864-0795",
      },
      {
        municipality: "Laur",
        cdrrmo: "0898-100-1380",
        bfp: "0942-551-6197",
        pnp: "0998-598-5429",
        rhuAmbulance: "0981-516-4728",
      },
      {
        municipality: "Palayan City",
        cdrrmo: "0920-574-1581\n0966-910-9674\n(044) 940-4357",
        bfp: "0943-066-9962\n(044) 511-4400",
        pnp: "0998-598-5430\n0995-683-2498",
        rhuAmbulance: "0920-947-2735\n0917-107-3808\n0920-574-1581",
      },
      {
        municipality: "Sta. Rosa",
        cdrrmo: "0917-156-3180\n0917-316-3172",
        bfp: "0934-595-7710",
        pnp: "0998-598-5432",
        rhuAmbulance: "0917-165-3529",
      },
    ],
  },
  {
    name: "District IV",
    entries: [
      {
        municipality: "Cabiao",
        cdrrmo: "(044) 333-1516\n0966-800-5010",
        bfp: "0933-855-5114",
        pnp: "0998-598-5433",
        rhuAmbulance: "0994-959-4048",
      },
      {
        municipality: "Gapan City",
        cdrrmo: "0995-342-5133",
        bfp: "0967-387-6877\n0933-111-3640",
        pnp: "0905-291-3329",
        rhuAmbulance: "0995-342-5133",
      },
      {
        municipality: "Gen. Tinio",
        cdrrmo: "0921-305-0931",
        bfp: "0942-290-4498",
        pnp: "0998-598-5436\n0936-634-8546 (SAF)\n0921-795-7412 (SAF)",
        rhuAmbulance: "0929-675-7874\n0919-006-6802\n0998-434-1073",
      },
      {
        municipality: "Jaen",
        cdrrmo: "0991-687-7727",
        bfp: "0915-970-4702",
        pnp: "0915-952-4422",
        rhuAmbulance: "0956-910-7679",
      },
      {
        municipality: "Peñaranda",
        cdrrmo: "0992-261-5103",
        bfp: "0923-281-7733",
        pnp: "0998-598-5438",
        rhuAmbulance: "0950-911-6241\nAmbulance: 0926-229-4513\n0965-227-5118",
      },
      {
        municipality: "San Leonardo",
        cdrrmo: "0917-792-1116",
        bfp: "0922-358-8737\n0905-185-4479",
        pnp: "0927-663-7722\n0998-598-5441",
        rhuAmbulance: "0916-376-5414\n0916-700-9693\nSan Leonardo Hospital: (044) 950-4246",
      },
      {
        municipality: "San Isidro",
        cdrrmo: "0985-267-8516\n0915-906-3654",
        bfp: "0922-432-6371\n0915-871-9073",
        pnp: "0916-646-3447\n0998-598-5440",
        rhuAmbulance: "0917-566-3831",
      },
      {
        municipality: "San Antonio",
        cdrrmo: "0927-879-6902",
        bfp: "0936-265-9066\n0928-353-4950",
        pnp: "0915-401-1009\n0998-598-5439",
        rhuAmbulance: "0981-517-7928\n0927-879-6902",
      },
    ],
  },
];
