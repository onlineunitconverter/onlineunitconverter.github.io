function showConverterHolder(choiceClass) {
    var converterClass = '.' + choiceClass + 'ConverterHolder';
    $(converterClass).fadeIn();
}

function closeDropdown(choiceClass) {
    $(".selectionBoxOpener." + choiceClass).removeClass("dropdownSelected");
    $(".selectionBoxDropdown." + choiceClass).fadeOut();
}

function selectDropdown(choiceClass) {
    $(".dropdownOpener." + choiceClass).toggleClass('flip');
    var isSelected = $(".selectionBoxOpener." + choiceClass).hasClass("dropdownSelected");
    if (isSelected == true) {
        closeDropdown(choiceClass);
    } else {
        $(".selectionBoxOpener." + choiceClass).addClass("dropdownSelected");
        $(".selectionBoxDropdown." + choiceClass).fadeIn();
    }
}

function submitDropdown(buttonClass, dropdownClass, originalBoolean) {
    if (originalBoolean == true) {
        var fullButtonClass = '.choice.' + buttonClass + '.original';
        var buttonText = $(fullButtonClass).text();
        localStorage.originalChoice = buttonText;
        localStorage.originalChoiceUnit = buttonClass;
        $(".dropdownOpener." + dropdownClass).toggleClass('flip');
        closeDropdown(dropdownClass);
        $(".dropdownOpenerText." + dropdownClass).text(buttonText);
    } else if (originalBoolean == false) {
        if (dropdownClass == "newDropdown") {
            var fullButtonClass = '.choice.' + buttonClass + '.new';
            var buttonText = $(fullButtonClass).text();
            localStorage.newChoice = buttonText;
            localStorage.newChoiceUnit = buttonClass;
            $(".dropdownOpener." + dropdownClass).toggleClass('flip');
            closeDropdown(dropdownClass);
            $(".dropdownOpenerText." + dropdownClass).text(buttonText);
        } else if (dropdownClass == "dpDropdown") {
            var fullButtonClass = '.choice.' + buttonClass + '.dp';
            var buttonText = $(fullButtonClass).text();
            var textInDecimal = textToDecimal(buttonClass);
            localStorage.decimalChoice = textInDecimal;
            $(".dropdownOpener." + dropdownClass).toggleClass('flip');
            closeDropdown(dropdownClass);
            $(".dropdownOpenerText." + dropdownClass).text(buttonText);
        } 
    }
}

function roundNumber(val, decimals) {
    val = parseFloat(val);
    return val.toFixed(decimals);
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

function submitConversion(type) {
    if (type == 'length') {
        var amount = $(".originalNumberInput").val();
        var originalUnit = localStorage.originalChoiceUnit;
        var newUnit = localStorage.newChoiceUnit;
        var dp = localStorage.decimalChoice;
        var convertedLength = convertLength(amount, originalUnit, newUnit, dp);
        $(".outputtedNumber").text(convertedLength);
        $(".numberOutput").fadeIn();
    }
}

function convertLength(amount, originalUnit, newUnit, dp) {
    var inBaseUnit = convertToMetres(amount, originalUnit);
    var finishedConversion = convertFromMetres(inBaseUnit, newUnit);
    if (dp == "none") {
        return finishedConversion;
    } else if (dp !== "none") {
        return +(roundNumber(finishedConversion, dp));
    }
}

function convertToMetres(amount, originalUnit) {
    if (originalUnit == "nm") {
        return amount/1000000000;
    } else if (originalUnit == "um") {
        return amount/1000000;
    } else if (originalUnit == "mm") {
        return amount/1000;
    } else if (originalUnit == "cm") {
        return amount/100;
    } else if (originalUnit == "m") {
        return amount;
    } else if (originalUnit == "km") {
        return amount*1000;
    } else if (originalUnit == "in") {
        return amount/39.37007874;
    } else if (originalUnit == "ft") {
        return amount/3.280839895;
    } else if (originalUnit == "yd") {
        return amount/1.0936132983;
    } else if (originalUnit == "mi") {
        return amount/0.00062137;
    } else if (originalUnit == "nmi") {
        return amount*1852;
    } else if (originalUnit == "ly") {
        return amount/0.00000000000000010570;
    }
}

function convertFromMetres(amount, inBaseUnit) {
    if (inBaseUnit == "nm") {
        return amount*1000000000;
    } else if (inBaseUnit == "um") {
        return amount*1000000;
    } else if (inBaseUnit == "mm") {
        return amount*1000;
    } else if (inBaseUnit == "cm") {
        return amount*100;
    } else if (inBaseUnit == "m") {
        return amount;
    } else if (inBaseUnit == "km") {
        return amount/1000;
    } else if (inBaseUnit == "in") {
        return amount*39.37007874;
    } else if (inBaseUnit == "ft") {
        return amount*3.280839895;
    } else if (inBaseUnit == "yd") {
        return amount*1.0936132983;
    } else if (inBaseUnit == "mi") {
        return amount*0.00062137;
    } else if (inBaseUnit == "nmi") {
        return amount/1852;
    } else if (inBaseUnit == "ly") {
        return amount*0.00000000000000010570;
    }
}

function textToDecimal(inputtedClass) {
    if (inputtedClass == "dp1") {
        return 1;
    } else if (inputtedClass == "dp2") {
        return 2;
    } else if (inputtedClass == "dp3") {
        return 3;
    } else if (inputtedClass == "dp4") {
        return 4;
    } else if (inputtedClass == "dp5") {
        return 5;
    } else if (inputtedClass == "dp6") {
        return 6;
    } else if (inputtedClass == "dp7") {
        return 7;
    } else if (inputtedClass == "dp8") {
        return 8;
    } else if (inputtedClass == "none") {
        return "none";
    }
}