import StyleDictionary from "style-dictionary"
import * as Utils from "./utils"

const nameForCss = path => path.join("-").toLowerCase()

StyleDictionary.registerTransform({
	name: "fluentui/name/kebab",
	type: "name",
	transformer: prop => nameForCss(Utils.getTokenExportPath(prop)),
})

StyleDictionary.registerTransform({
	name: "fluentui/alias/css",
	type: "value",
	matcher: prop => "resolvedAliasPath" in prop,
	transformer: prop => `var(--${nameForCss(prop.resolvedAliasPath)})`,
})

StyleDictionary.registerTransform({
	name: "fluentui/size/css",
	type: "value",
	matcher: prop => prop.attributes.category === "size",
	transformer: prop =>
	{
		/*
			Transforms an array of top/right/bottom/left values into a CSS margin or padding string.
			Single values are also allowed. All numbers are interpreted as pixels.

			100
				-->
			100px

			[ 100, 200, 300, 400 ]
				-->
			100px 200px 300px 400px
		*/
		const value = prop.value
		if (typeof value === "number")
			return `${value}px`
		else if (Array.isArray(value) && value.length === 4)
			return `${value[0]}px ${value[1]}px ${value[2]}px ${value[3]}px`

		console.warn(`Unrecognized size value: "${value}". Use a single number or an array [top, right, bottom, left].`)
		return value
	},
})

StyleDictionary.registerTransformGroup({
	name: "fluentui/css",
	transforms: ["fluentui/attribute", "fluentui/name/kebab", "fluentui/alias/css", "time/seconds", "fluentui/size/css", "color/css"],
})

StyleDictionary.registerTransformGroup({
	name: "fluentui/cssflat",
	transforms: ["fluentui/attribute", "fluentui/name/kebab", "time/seconds", "fluentui/size/css", "color/css"],
})
