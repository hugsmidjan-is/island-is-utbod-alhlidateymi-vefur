import { defineMessages } from 'react-intl'

export const tax = defineMessages({
  dataRequirements: {
    id: 'taxReturn.application:general.dataRequirements',
    defaultMessage: 'Gagnaöflun',
  },
  applicationName: {
    id: 'taxReturn.application:general.applicationName',
    defaultMessage: 'Skil á skattaframtali',
  },
  applicationOwner: {
    id: 'taxReturn.application:general.applicationOwner',
    defaultMessage: 'Skatturinn',
  },
  generalInfoTitle: {
    id: 'taxReturn.application:generalInfo.title',
    defaultMessage: 'Almennar upplýsingar',
  },
  generalInfoIntro: {
    id: 'taxReturn.application:generalInfo.intro',
    defaultMessage: 'Almennar upplýsingar',
  },
  confirmationTitle: {
    id: 'taxReturn.application:confirmation.title',
    defaultMessage: 'Staðfesting',
    description: 'Title of confirmation form',
  },
  lastIncomeTitle: {
    id: 'taxReturn.application:lastIncome.title',
    defaultMessage: 'Tekjur ársins',
  },
  lastIncomeTitleYr: {
    id: 'taxReturn.application:lastIncome.titleYr',
    defaultMessage: 'Tekjur ársins 2024',
  },
  lastIncomeIntro: {
    id: 'taxReturn.application:lastIncome.intro',
    defaultMessage: 'Lorem ipsum',
  },
  lastIncomeLabel: {
    id: 'taxReturn.application:lastIncome.label',
    defaultMessage: '2.1 Launatekjur og starfstengdar greiðslur',
  },
  extraIncomeLabel: {
    id: 'taxReturn.application:extraIncome.label',
    defaultMessage: '2.2 Ökutækjastyrkur, Dagpeningar, Hlunnindi',
  },
  pensionIncomeLabel: {
    id: 'taxReturn.application:pensionIncomeLabel.label',
    defaultMessage: '2.3 Lífeyrisgreiðslur, Greiðslur úr Tryggingastofnun.',
  },
  pensionIncomeLabelTwo: {
    id: 'taxReturn.application:pensionIncomeLabelTwo.label',
    defaultMessage: 'Aðrar bótagreiðslur, styrkir o.fl',
  },
  capitalIncomeTitle: {
    id: 'taxReturn.application:capitalIncome.title',
    defaultMessage: 'Fjármagnstekjur',
  },
  capitalIncomeTitleYr: {
    id: 'taxReturn.application:capitalIncome.titleYr',
    defaultMessage: 'Fjármagnstekjur ársins 2024',
  },
  endOfYearTitle: {
    id: 'taxReturn.application:endOfYear.title',
    defaultMessage: 'Eignir í árslok',
  },
  endOfYearIntro: {
    id: 'taxReturn.application:endOfYear.intro',
    defaultMessage:
      'Fasteignir eru skráðar á fasteignamati ársins. Bifreiðir sem keyptar voru á árinu eru skráðar á kaupverð og eldri bifreiðir lækka um 10% á ári.',
  },
  interestChargesTitle: {
    id: 'taxReturn.application:interestCharges.title',
    defaultMessage: 'Skuldir og vaxtagjöld',
  },
  draftStatusLabel: {
    id: 'taxReturn.application:general.draftStatusLabel',
    defaultMessage: 'Í vinnslu hjá innsendanda',
  },
  sendApplication: {
    id: 'taxReturn.application:general.sendApplication',
    defaultMessage: 'Senda umsókn',
  },
  submittedStatusLabel: {
    id: 'taxReturn.application:general.submittedStatusLabel',
    defaultMessage: 'Framtal sent til Skattsins',
  },
  launagreidandi: {
    id: 'taxReturn.application:income.launagreidandi',
    defaultMessage: 'Launagreiðandi',
  },
  type: {
    id: 'taxReturn.application:income.type',
    defaultMessage: 'Tegund',
  },
  fyrirhvad: {
    id: 'taxReturn.application:income.fyrirhvad',
    defaultMessage: 'Fyrir hvað',
  },
  upphaed: {
    id: 'taxReturn.application:income.upphaed',
    defaultMessage: 'Upphæð',
  },
  propertyNr: {
    id: 'taxReturn.application:income.propertyNr',
    defaultMessage: 'Fastanúmer eignar',
  },
  propertyLabel: {
    id: 'taxReturn.application:income.propertyLabel',
    defaultMessage: 'Fasteign',
  },
  propertyEvaluation: {
    id: 'taxReturn.application:income.propertyEvaluation',
    defaultMessage: 'Fasteignamat',
  },
  vehicleNr: {
    id: 'taxReturn.application:income.vehicleNr',
    defaultMessage: 'Númer eignar',
  },
  buyYear: {
    id: 'taxReturn.application:income.buyYear',
    defaultMessage: 'Kaupár',
  },
  price: {
    id: 'taxReturn.application:income.price',
    defaultMessage: 'Verð',
  },
})

export const taxGeneralInfo = defineMessages({
  basicInfo: {
    id: 'taxReturn.application:generalInfo.basicInfo',
    defaultMessage: 'Grunnupplýsingar',
  },
  communication: {
    id: 'taxReturn.application:generalInfo.communication',
    defaultMessage: 'Samskipti',
  },
  name: {
    id: 'taxReturn.application:generalInfo.name',
    defaultMessage: 'Nafn',
  },
  nationalId: {
    id: 'taxReturn.application:general.nationalId',
    defaultMessage: 'Kennitala',
  },
  address: {
    id: 'taxReturn.application:generalInfo.address',
    defaultMessage: 'Heimilisfang',
  },
  city: {
    id: 'taxReturn.application:generalInfo.city',
    defaultMessage: 'Sveitafélag',
  },
  email: {
    id: 'taxReturn.application:generalInfo.email',
    defaultMessage: 'Netfang',
  },
  phone: {
    id: 'taxReturn.application:generalInfo.phone',
    defaultMessage: 'Símanúmer',
  },
})

export const taxEndOfYear = defineMessages({
  fasteignLabel: {
    id: 'taxReturn.application:endOfYear.fasteignLabel',
    defaultMessage: '4.1 Innlendar fasteignir',
  },
  fastanumer: {
    id: 'taxReturn.application:endOfYear.fasteign.fastanumer',
    defaultMessage: 'Fastanúmer',
  },
  fasteign: {
    id: 'taxReturn.application:endOfYear.fasteign.fasteign',
    defaultMessage: 'Fasteign',
  },
  fasteignamat: {
    id: 'taxReturn.application:endOfYear.fasteign.fasteignamat',
    defaultMessage: 'Fasteignamat',
  },
  vehicleLabel: {
    id: 'taxReturn.application:endOfYear.vehicleLabel',
    defaultMessage: '4.3 Bifreiðir',
  },
  numer: {
    id: 'taxReturn.application:endOfYear.vehicle.numer',
    defaultMessage: 'Númer',
  },
  kaupar: {
    id: 'taxReturn.application:endOfYear.vehicle.kaupar',
    defaultMessage: 'Kaupár',
  },
  verd: {
    id: 'taxReturn.application:endOfYear.vehicle.verd',
    defaultMessage: 'Verð',
  },
})

export const taxInterestCharges = defineMessages({
  interestChargesTitle: {
    id: 'taxReturn.application:interestCharges.title',
    defaultMessage: 'Skuldir og vaxtagjöld',
  },
  interestChargesSubTitle: {
    id: 'taxReturn.application:interestCharges.subTitle',
    defaultMessage:
      'Í framtalinu þarf að skrá inn öll lán, skuldir og vaxtagjöld. Þar með talin íbúðarlán, skuldir við greiðslukortafyrirtæki og smálánafyrirtæki. ',
  },
  interestChargesIntro: {
    id: 'taxReturn.application:interestCharges.intro',
    defaultMessage:
      '5.2 Lán vegna kaupa eða byggingar íbúðarhúsnæðis til eigin nota.',
  },
  filledBy: {
    id: 'taxReturn.application:interestCharges.filledBy',
    defaultMessage: 'Fyllt út af Ríkisskattstjóra',
  },
  disclaimer: {
    id: 'taxReturn.application:interestCharges.disclaimer',
    defaultMessage:
      'Ef hluti af láninu fer til annars en íbúðarhúsnæðis, þá þarf að tilgreina hversu mikið af láninu var notað til að kaupa eða byggja íbúðarhúsnæði. ',
  },
})

export const requirements = {
  general: defineMessages({
    title: {
      id: 'taxReturn.application:requirements.general.title',
      defaultMessage: 'Gagnaöflun',
      description: 'Title of requirements form',
    },
    subTitle: {
      id: 'taxReturn.application:requirements.general.subTitle',
      defaultMessage: 'Eftirfarandi upplýsingar verða sóttar rafrænt',
    },
    taxProviderTitle: {
      id: 'taxReturn.application:requirements.general.taxProviderTitle',
      defaultMessage: 'Upplýsingar frá Skattinum',
    },
    taxProviderSubTitle: {
      id: 'taxReturn.application:requirements.general.taxProviderSubTitle',
      defaultMessage: 'Upplýsingar fyrir skattframtal 2024.',
    },
    taxNatRegProviderTitle: {
      id: 'taxReturn.application:requirements.general.taxNatRegProviderTitle',
      defaultMessage: 'Upplýsingar frá Þjóðskrá',
    },
    taxNatRegProviderSubTitle: {
      id: 'taxReturn.application:requirements.general.taxNatRegProviderSubTitle',
      defaultMessage: 'Upplýsingar frá Þjóðskrá íslands.',
    },
    intro: {
      id: 'taxReturn.application:requirements.general.intro',
      defaultMessage: `Upplýsingar frá Þjóðskrá, RSK og Útlendingarstofnun{br}
      Upplýsingar um þig, maka og börn. Upplýsingar um búsetu.
      {brbr}
      Upplýsingar af frá Skattinum{br}
      Upplýsingar fyrir skattframtal 2024.
      {brbr}
      Upplýsingar af mínum síðum Ísland.is{br}
      Upplýsingar um netfang, símanúmer og bankareikning eru sóttar á mínar síður á Ísland.is. 
      `,
      description: 'Description of requirements form',
    },
  }),
  buttons: defineMessages({
    continue: {
      id: 'taxReturn.application:requirements.buttons.continue',
      defaultMessage: 'Halda áfram',
    },
  }),
  inputs: defineMessages({
    accept: {
      id: 'taxReturn.application:requirements.inputs.accept',
      defaultMessage:
        'Ég skil að ofangreindra upplýsinga verður aflað í umsóknarferlinu',
    },
    required: {
      id: 'taxReturn.application:error.dataGathering',
      defaultMessage: 'Samþykkja þarf gagnaöflun til að halda áfram',
    },
  }),
}

export const confirmation = defineMessages({
  received: {
    id: 'taxReturn.application:confirmation.received',
    defaultMessage: 'Skattframtal móttekið',
  },
  alert: {
    id: 'taxReturn.application:confirmation.alert',
    defaultMessage: `Skattframtalinu var skilað 8. mars 2024 kl 14:32.{br}
      Móttökunúmer:1.702
      {br}{br}
      Þú getur alltaf nálgast eintak af kvittuninni inn á Mínum síðum, skoðað bráðabirgðaútreikning og sent inn viðbótargögn eða leiðréttingu.`,
    description: 'Alert message in confirmation form',
  },
  whatHappensNext: {
    id: 'taxReturn.application:confirmation.whatHappensNext',
    defaultMessage: 'Hvað gerist næst?',
  },
  disclaimer: {
    id: 'taxReturn.application:confirmation.disclaimer',
    defaultMessage:
      'Skatturinn fer yfir framtalið. Ef þörf er a er kallað eftir frekarupplýsingum/gögnum.',
  },
  results: {
    id: 'taxReturn.application:confirmation.results',
    defaultMessage:
      'Niðurstöður álagningar verða birtar í lok maí. Hafi of lágum skatti verið haldið eftir í staðgreiðslu verður þú að standa skil á því sem upp á vantar.',
  },
  returnTooHigh: {
    id: 'taxReturn.application:confirmation.returnTooHigh',
    defaultMessage:
      'Hins vegar hafi of hárri staðgreiðslu verið haldið eftir getur það leitt til endurgreiðslu við álagningu opinberra gjalda.',
  },
  notificationWhenAvailable: {
    id: 'taxReturn.application:confirmation.notificationWhenAvailable',
    defaultMessage:
      'Þú munt fá tilkynningu á netfang þegar niðurstöður álagningar eru aðgengilegar á Mínum síðum.',
  },
})
