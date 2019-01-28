export const CHAR_LIMIT = 600;
export const AUTO_SAVE_INTERVAL = 2500;
export const LOCAL_STORAGE_KEY = 'MARKIE_SAVER_CACHE';
export const VOICE_COMMANDS = {
  stop: 'stop',
  print: 'print',
  break: 'break'
};

/**
 * Units: "twips" are "screen-independent" units. 15twips = 1px
 * PaperName: should match the name of the label used, in this case: "99014 Shipping"
 */
export const LABEL_XML_TEMPLATE =
  '<?xml version="1.0" encoding="utf-8"?>\
  <DieCutLabel Version="8.0" Units="twips">\
    <PaperOrientation>Landscape</PaperOrientation>\
    <Id>Address</Id>\
    <PaperName>99014 Shipping</PaperName>\
    <DrawCommands>\
      <RoundRectangle X="0" Y="0" Width="5000" Height="4000" Rx="0" Ry="0" />\
    </DrawCommands>\
    <ObjectInfo>\
      <TextObject>\
        <Name>COMMENT</Name>\
        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
        <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
        <LinkedObjectName></LinkedObjectName>\
        <Rotation>Rotation0</Rotation>\
        <IsMirrored>False</IsMirrored>\
        <IsVariable>True</IsVariable>\
        <HorizontalAlignment>Left</HorizontalAlignment>\
        <VerticalAlignment>Middle</VerticalAlignment>\
        <TextFitMode>ShrinkToFit</TextFitMode>\
        <UseFullFontHeight>False</UseFullFontHeight>\
        <Verticalized>False</Verticalized>\
        <StyledText/>\
      </TextObject>\
      <Bounds X="300" Y="-500" Width="5000" Height="4000" />\
    </ObjectInfo>\
  </DieCutLabel>';
