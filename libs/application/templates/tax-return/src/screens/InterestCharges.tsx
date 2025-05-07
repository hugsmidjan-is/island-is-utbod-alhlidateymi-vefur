import { useLocale } from '@island.is/localization'
import { FormScreen } from '../components/form/FormScreen'
import { taxInterestCharges } from '../lib/messages'
import { OJOIFieldBaseProps } from '../lib/types'
import { AlertMessage, Box, Text } from '@island.is/island-ui/core'
import {
  Body,
  Data,
  Head,
  HeadData,
  Row,
  Table,
} from 'libs/island-ui/core/src/lib/Table/Table'
import { BaseInputController } from '../components/input/BaseInputController'
export const InterestChargesScreen = (props: OJOIFieldBaseProps) => {
  const { formatMessage: f } = useLocale()

  return (
    <FormScreen
      goToScreen={props.goToScreen}
      title={f(taxInterestCharges.interestChargesTitle)}
    >
      <Box>
        <Text fontWeight="semiBold">
          {f(taxInterestCharges.interestChargesIntro)}
        </Text>
        <Text>
          Lán sem að hluta eða öllu leyti tengjast íbúðarhúsnæði. Ef aðeins
          hluti lánsins á við, þarf að gera grein fyrir því hlutfalli.
        </Text>
      </Box>
      <Table>
        <Head>
          <Row>
            <HeadData>Fyllist út af ríkisskattstjóra</HeadData>
            <HeadData></HeadData>
          </Row>
        </Head>
        <Body>
          <Row>
            <Data width={'50%'}>
              <Text fontWeight="semiBold" variant="medium">
                Staðsetning íbúðarhúsnæðis
              </Text>
            </Data>
            <Data>Bláfjallagata 12</Data>
          </Row>
        </Body>
      </Table>
      <Text>
        Ef hluti láns er nýttur til annars en öflunar íbúðarhúsnæðis skal
        tilgreinar hve hátt hlutfall fjárhæðar er til öflunar íbúðarhúsnæðis
        (reitur 1). Í reiti 5 til 8 skal færa heildarfjárhæðir (án hlutföllunar)
        en í dálka 9 og 10 skal aðeins færa þann hluta af vaxtagjöldum og
        eftirstöðvum sem tilheyra öflun íbúðarhúsnæðis.
      </Text>
      <Table>
        <Head>
          <Row>
            <HeadData>Útreikningur</HeadData>
            <HeadData align="right">Fjárhæð</HeadData>
          </Row>
        </Head>
        <Body>
          <Row>
            <Data width={'60%'}>
              <Text fontWeight="semiBold" variant="medium">
                Lánshlutfall
              </Text>
            </Data>
            <Data align="right">
              {/* <BaseInputController
                id={'id'}
                name={'id'}
                defaultValue={'id'}
                label={''}
                textarea={false}
                maxLength={180}
                placeholder="0 kr."
                type={'number'}
                suffix=" %"
                min={0}
                max={100}
              /> */}
            </Data>
          </Row>
        </Body>
      </Table>
      <AlertMessage
        type="info"
        title="Vaxtagjöld og lán eða lánshlutar sem ekki ganga til öflunar íbúðarhúsnæðis færast í kafla 5.5."
      />
    </FormScreen>
  )
}
