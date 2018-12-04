export const CHAR_LIMIT = 250;
export const AUTO_SAVE_INTERVAL = 2500;
export const LOCAL_STORAGE_KEY = 'MARK_SAVER_CACHE';
export const VOICE_COMMANDS = {
  stop: 'stop',
  print: 'print'
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
      <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" />\
    </DrawCommands>\
    <ObjectInfo>\
      <TextObject>\
        <Name>COMMENT</Name>\
        <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
        <BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
        <LinkedObjectName></LinkedObjectName>\
        <Rotation>Rotation0</Rotation>\
        <IsMirrored>False</IsMirrored>\
        <IsVariable>False</IsVariable>\
        <HorizontalAlignment>Left</HorizontalAlignment>\
        <VerticalAlignment>Top</VerticalAlignment>\
        <TextFitMode>ShrinkToFit</TextFitMode>\
        <UseFullFontHeight>True</UseFullFontHeight>\
        <Verticalized>False</Verticalized>\
        <StyledText/>\
      </TextObject>\
      <Bounds X="331" Y="57" Width="4622" Height="1435" />\
    </ObjectInfo>\
  </DieCutLabel>';
