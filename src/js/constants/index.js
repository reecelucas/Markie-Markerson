export const USER_ACTIONS = {
  clear: 'clear',
  print: 'print',
  record: 'record'
};
export const CHAR_LIMIT = 250;
export const AUTO_SAVE_INTERVAL = 2500;
export const LOCAL_STORAGE_KEY = 'MARK_SAVER_CACHE';
export const VOICE_COMMANDS = {
  stop: 'stop',
  print: 'print'
};
export const LABEL_XML_TEMPLATE = `
  <?xml version="1.0" encoding="utf-8"?>
  <DieCutLabel Version="8.0" Units="twips">
    <PaperOrientation>Landscape</PaperOrientation>
    <Id>Address</Id>
    <PaperName>30252 Address</PaperName>
    <DrawCommands>
      <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" />
    </DrawCommands>
    <ObjectInfo>
      <AddressObject>
        <Name>Comment</Name>
        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
        <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
        <LinkedObjectName></LinkedObjectName>
        <Rotation>Rotation0</Rotation>
        <IsMirrored>False</IsMirrored>
        <IsVariable>True</IsVariable>
        <HorizontalAlignment>Left</HorizontalAlignment>
        <VerticalAlignment>Middle</VerticalAlignment>
        <TextFitMode>ShrinkToFit</TextFitMode>
        <UseFullFontHeight>True</UseFullFontHeight>
        <Verticalized>False</Verticalized>
        <StyledText/>
        <ShowBarcodeFor9DigitZipOnly>False</ShowBarcodeFor9DigitZipOnly>
        <BarcodePosition>BelowAddress</BarcodePosition>
        <LineFonts/>
      </AddressObject>
      <Bounds X="332" Y="150" Width="4455" Height="1260" />
    </ObjectInfo>
  </DieCutLabel>
`;
