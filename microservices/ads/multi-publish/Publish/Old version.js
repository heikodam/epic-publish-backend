const immowelt = {
    category: {
        name: 'category',
        elType: 'select',
        elConfig: {
            disabled: 'true',
            type: 'select',
            options: [
                { value: 'realEstate', displayValue: 'Immobilien' },
            ]
        },
        validation: {
            required: true,
        },
        value: 'real-estate',
        valid: true
      },
    subCategory: {
        name: 'subCategory',
        elType: 'select',
        elConfig: {
            type: 'select',
            disabled: 'true',
            options: [
            { value: 'rentalApartment', displayValue: 'Mietwohnung' },
            ]
        },
        validation: {
            required: true,
        },
        valid: false,
    },
    size: {
        name: 'size',
        elConfig: {
            placeholder: 'Wohnfläche'
        },
        validation: {
            required: true,
            isNumeric: true
        },
        valid: false,
    },
    rooms: {
        name: 'rooms',
        elConfig: {
            placeholder: 'Zimmer'
        },
        validation: {
            required: true,
            isNumeric: true
        },
        valid: false,
    },
    bedrooms: {
        name: 'bedrooms',
        elConfig: {
            placeholder: 'Schlafzimmer'
        },
        validation: {
            isNumeric: true
        },
        valid: false,
    },
    bathrooms: {
        name: 'bathrooms',
        elConfig: {
            placeholder: 'Badezimmer'
        },
        validation: {
            isNumeric: true
        },
        valid: false,
    },
    floor: {
        name: 'floor',
        elConfig: {
            placeholder: 'Etage'
        },
        validation: {
            isNumeric: true
        },
        valid: false,
    },
    apartmentType: {
        name: 'apartmentType',
        elType: 'select',
        elConfig: {
            type: 'select',
            options: [
                { value: '', displayValue: 'Bitte wählen' },
                { value: 'topFloorApartment', displayValue: 'Dachgeschosswohnung' },
                { value: 'groundFloorApartment', displayValue: 'Erdgeschosswohnung' },
                { value: 'etagenwohnung', displayValue: 'Etagenwohnung' },
                { value: 'raisedGroundFloor', displayValue: 'Hochparterre' },
                { value: 'loft', displayValue: 'Loft' },
                { value: 'select', displayValue: 'Maisonette' },
                { value: 'penthouse', displayValue: 'Penthouse' },
                { value: 'souterrain', displayValue: 'Souterrain' },
                { value: 'otherTypes', displayValue: 'Andere Wohnungstypen' },
            ]
        },
      },
    monthAvailability: {
        name: 'monthAvailability',
        elType: 'select',
        elConfig: {
            type: 'select',
            options: [
                { value: '', displayValue: 'Bitte wählen' },
                { value: '1', displayValue: '01' },
                { value: '2', displayValue: '02' },
                { value: '3', displayValue: '03' },
                { value: '4', displayValue: '04' },
                { value: '5', displayValue: '05' },
                { value: '6', displayValue: '06' },
                { value: '7', displayValue: '07' },
                { value: '8', displayValue: '08' },
                { value: '9', displayValue: '09' },
                { value: '10', displayValue: '10' },
                { value: '11', displayValue: '11' },
                { value: '12', displayValue: '12' },
            ]
        }
    },
    yearAvailability: {
        name: 'yearAvailability',
        elType: 'select',
        elConfig: {
            type: 'select',
            options: [
                { value: '', displayValue: 'Bitte wählen' },
                { value: '2020', displayValue: '2020' },
                { value: '2021', displayValue: '2021' },
                { value: '2022', displayValue: '2022' },
                { value: '2023', displayValue: '2023' },
                { value: '2024', displayValue: '2024' },
            ]
        },
    },
    serviceCosts: {
        name: 'serviceCosts',
        elConfig: {
            placeholder: 'Nebenkosten in €'
        },
        validation: {
            isNumeric: true
        },
    },
    heatingConsts: {
        name: 'heatingConsts',
        elConfig: {
            placeholder: 'Heizkosten in €'
        },
        validation: {
            isNumeric: true
        }
    },
    totalRent: {
        name: 'totalRent',
        elConfig: {
            placeholder: 'Warmmiete in €'
        },
        validation: {
            isNumeric: true
        }
    },
    deposit: {
        name: 'deposit',
        elConfig: {
            placeholder: 'Kaution in €'
        },
        validation: {
            isNumeric: true
        }
    },
    apartmentFurnishings: {
        name: 'apartmentFurnishings',
        elType: 'checkbox',
        elConfig: {
            type: 'checkbox',
            options: [
                { name: 'apartmentFurnishings', value: 'furnished', label: 'Möbliert/Teilmöbliert' },
                { name: 'apartmentFurnishings', value: 'balcony', label: 'Balkon' },
                { name: 'apartmentFurnishings', value: 'terrace', label: 'Terrasse' },
                { name: 'apartmentFurnishings', value: 'kitchen', label: 'Einbauküche' },
                { name: 'apartmentFurnishings', value: 'bathtub', label: 'Badewanne' },
                { name: 'apartmentFurnishings', value: 'guestBathroom', label: 'Gäste WC' },
                { name: 'apartmentFurnishings', value: 'steplessAccess', label: 'Stufenloser Zugang' },
                { name: 'apartmentFurnishings', value: 'floorHeating', label: 'Fußbodenheizung' },
            ]
        },
    },
    generalCharacteristics: {
        name: 'generalCharacteristics',
        elType: 'checkbox',
        elConfig: {
            type: 'checkbox',
            options: [
                { name: 'generalCharacteristics', value: 'oldBuilding', label: 'Altbau' },
                { name: 'generalCharacteristics', value: 'newBuilding', label: 'Neubau' },
                { name: 'generalCharacteristics', value: 'elevator', label: 'Aufzug' },
                { name: 'generalCharacteristics', value: 'basement', label: 'Keller' },
                { name: 'generalCharacteristics', value: 'loft', label: 'Dachboden' },
                { name: 'generalCharacteristics', value: 'WBSneeded', label: 'WBS benötigt' },
                { name: 'generalCharacteristics', value: 'parkingSpace', label: 'Garage/Stellplatz' },
                { name: 'generalCharacteristics', value: 'garden', label: 'Garten/-mitnutzung' },
                { name: 'generalCharacteristics', value: 'pets', label: 'Haustiere erlaubt' },
                { name: 'generalCharacteristics', value: 'WGsuitable', label: 'WG-geeignet' },
            ]
        },
    },
    adType: {
        name: 'adType',
        elType: 'radio',
        elConfig: {
            type: 'radio',
            options: [
                { name: 'adType', value: 'renting', checked: true, label: 'Ich Biete' },
                { name: 'adType', value: 'searching', label: 'Ich suche' },
            ]
        },
        validation: {
            required: true
        },
        valid: false,
    },
    title: {
        name: 'title',
        elConfig: {
            placeholder: 'Your ad Title'
        },
        validation: {
            required: true,
        },
        valid: false,
    },
    description: {
        name: 'description',
        elType: 'textarea',
        elConfig: {
            type: 'textarea',
            placeholder: 'Your detailed description of your ad...'
        },
        validation: {
            required: true
        },
        valid: false,
    },
    rent: {
        name: 'rent',
        elConfig: {
            placeholder: 'Kaltmiete in €'
        },
        validation: {
            required: true,
            isNumeric: true
        },
        valid: false,
    },
    priceType: {
        name: 'priceType',
        elType: 'radio',
        elConfig: {
            type: 'radio',
            options: [
                { name: 'priceType', value: 'fixed', checked: true, label: 'Festpreis' },
                { name: 'priceType', value: 'negotiable', label: 'VB' },
                { name: 'priceType', value: 'giveAway', label: 'Zu Verschenken' },
            ]
        },
        validation: {
            required: true
        },
        value: "fixed",
        valid: false,
    },
    imgUpload: {
        name: 'imgUpload',
        elType: 'fileUpload',
        elConfig: {
            type: 'file',
            accept: '.jpg, .jpeg, .png',
            multiple: true
        }
    },
    zipCode: {
        name: 'zipCode',
        elConfig: {
            placeholder: 'PLZ'
        },
        validation: {
            required: true,
            isNumeric: true,
            minLength: 5,
            maxLength: 5,
        },
        valid: false,
    },
    streetNumber: {
        name: 'streetNumber',
        elConfig: {
            placeholder: 'Straße/Nr.'
        },
    },
    posterType: {
        name: 'posterType',
        elType: 'radio',
        elConfig: {
            type: 'radio',
            options: [
                { name: 'posterType', value: 'privat', checked: true, label: 'Privat' },
                { name: 'posterType', value: 'commercial', label: 'Gewerblich' },
            ]
        },
        validation: {
            required: true
        },
        valid: false,
    },
    name: {
        name: 'name',
        elConfig: {
            placeholder: 'Name'
        },
        validation: {
            required: true
        },
        valid: false,
    },
    phoneNumber: {
        name: 'phoneNumber',
        elConfig: {
            placeholder: 'Phone Number'
        },
        validation: {
            isNumeric: true
        }
    },
}


export default immowelt;