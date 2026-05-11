declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"notas": {
"nota-001.md": {
	id: "nota-001.md";
  slug: "nota-001";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-002.md": {
	id: "nota-002.md";
  slug: "nota-002";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-003.md": {
	id: "nota-003.md";
  slug: "nota-003";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-004.md": {
	id: "nota-004.md";
  slug: "nota-004";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-005.md": {
	id: "nota-005.md";
  slug: "nota-005";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-006.md": {
	id: "nota-006.md";
  slug: "nota-006";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-007.md": {
	id: "nota-007.md";
  slug: "nota-007";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-008.md": {
	id: "nota-008.md";
  slug: "nota-008";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-009.md": {
	id: "nota-009.md";
  slug: "nota-009";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-010.md": {
	id: "nota-010.md";
  slug: "nota-010";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-011.md": {
	id: "nota-011.md";
  slug: "nota-011";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-012.md": {
	id: "nota-012.md";
  slug: "nota-012";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-013.md": {
	id: "nota-013.md";
  slug: "nota-013";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-014.md": {
	id: "nota-014.md";
  slug: "nota-014";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-015.md": {
	id: "nota-015.md";
  slug: "nota-015";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-016.md": {
	id: "nota-016.md";
  slug: "nota-016";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-017.md": {
	id: "nota-017.md";
  slug: "nota-017";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-018.md": {
	id: "nota-018.md";
  slug: "nota-018";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-019.md": {
	id: "nota-019.md";
  slug: "nota-019";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-020.md": {
	id: "nota-020.md";
  slug: "nota-020";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-021.md": {
	id: "nota-021.md";
  slug: "nota-021";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-022.md": {
	id: "nota-022.md";
  slug: "nota-022";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-023.md": {
	id: "nota-023.md";
  slug: "nota-023";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-024.md": {
	id: "nota-024.md";
  slug: "nota-024";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-025.md": {
	id: "nota-025.md";
  slug: "nota-025";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-026.md": {
	id: "nota-026.md";
  slug: "nota-026";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-027.md": {
	id: "nota-027.md";
  slug: "nota-027";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-028.md": {
	id: "nota-028.md";
  slug: "nota-028";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-029.md": {
	id: "nota-029.md";
  slug: "nota-029";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-030.md": {
	id: "nota-030.md";
  slug: "nota-030";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-031.md": {
	id: "nota-031.md";
  slug: "nota-031";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-032.md": {
	id: "nota-032.md";
  slug: "nota-032";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-033.md": {
	id: "nota-033.md";
  slug: "nota-033";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-034.md": {
	id: "nota-034.md";
  slug: "nota-034";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-035.md": {
	id: "nota-035.md";
  slug: "nota-035";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-036.md": {
	id: "nota-036.md";
  slug: "nota-036";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-037.md": {
	id: "nota-037.md";
  slug: "nota-037";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-038.md": {
	id: "nota-038.md";
  slug: "nota-038";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-039.md": {
	id: "nota-039.md";
  slug: "nota-039";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-040.md": {
	id: "nota-040.md";
  slug: "nota-040";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-041.md": {
	id: "nota-041.md";
  slug: "nota-041";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-042.md": {
	id: "nota-042.md";
  slug: "nota-042";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-043.md": {
	id: "nota-043.md";
  slug: "nota-043";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-044.md": {
	id: "nota-044.md";
  slug: "nota-044";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-045.md": {
	id: "nota-045.md";
  slug: "nota-045";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-046.md": {
	id: "nota-046.md";
  slug: "nota-046";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-047.md": {
	id: "nota-047.md";
  slug: "nota-047";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-048.md": {
	id: "nota-048.md";
  slug: "nota-048";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-049.md": {
	id: "nota-049.md";
  slug: "nota-049";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-050.md": {
	id: "nota-050.md";
  slug: "nota-050";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-051.md": {
	id: "nota-051.md";
  slug: "nota-051";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-052.md": {
	id: "nota-052.md";
  slug: "nota-052";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-053.md": {
	id: "nota-053.md";
  slug: "nota-053";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-054.md": {
	id: "nota-054.md";
  slug: "nota-054";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-055.md": {
	id: "nota-055.md";
  slug: "nota-055";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-056.md": {
	id: "nota-056.md";
  slug: "nota-056";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-057.md": {
	id: "nota-057.md";
  slug: "nota-057";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-058.md": {
	id: "nota-058.md";
  slug: "nota-058";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-059.md": {
	id: "nota-059.md";
  slug: "nota-059";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-060.md": {
	id: "nota-060.md";
  slug: "nota-060";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-061.md": {
	id: "nota-061.md";
  slug: "nota-061";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
"nota-062.md": {
	id: "nota-062.md";
  slug: "nota-062";
  body: string;
  collection: "notas";
  data: InferEntrySchema<"notas">
} & { render(): Render[".md"] };
};
"relatos": {
"Dark-souls-y.md": {
	id: "Dark-souls-y.md";
  slug: "dark-souls-y";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"El-012-sobre-una-medida-de-lucha.md": {
	id: "El-012-sobre-una-medida-de-lucha.md";
  slug: "el-012-sobre-una-medida-de-lucha";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"El-uso-del-Calculo-integral-en-diferentes-ramas-de-la-intelectualidad.md": {
	id: "El-uso-del-Calculo-integral-en-diferentes-ramas-de-la-intelectualidad.md";
  slug: "el-uso-del-calculo-integral-en-diferentes-ramas-de-la-intelectualidad";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"La-Banderita.md": {
	id: "La-Banderita.md";
  slug: "la-banderita";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"La-toma-del-software-el-tecno-obrero.md": {
	id: "La-toma-del-software-el-tecno-obrero.md";
  slug: "la-toma-del-software-el-tecno-obrero";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"Xiou.md": {
	id: "Xiou.md";
  slug: "xiou";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"al-doblar-la-esquina.md": {
	id: "al-doblar-la-esquina.md";
  slug: "al-doblar-la-esquina";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"bajo-el-cielo-de-lima.md": {
	id: "bajo-el-cielo-de-lima.md";
  slug: "bajo-el-cielo-de-lima";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"como-volveras.md": {
	id: "como-volveras.md";
  slug: "como-volveras";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"deberian-dar-bonos-a-los-peruanos.md": {
	id: "deberian-dar-bonos-a-los-peruanos.md";
  slug: "deberian-dar-bonos-a-los-peruanos";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"diogenes-el-perro.md": {
	id: "diogenes-el-perro.md";
  slug: "diogenes-el-perro";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"doom-y-doom-2.md": {
	id: "doom-y-doom-2.md";
  slug: "doom-y-doom-2";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"el-tiempo-contigo-antes-del-amanecer.md": {
	id: "el-tiempo-contigo-antes-del-amanecer.md";
  slug: "el-tiempo-contigo-antes-del-amanecer";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"es-momento-de-leer.md": {
	id: "es-momento-de-leer.md";
  slug: "es-momento-de-leer";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"la-espada.md": {
	id: "la-espada.md";
  slug: "la-espada";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"la-mancha-de-mi-cabeza.md": {
	id: "la-mancha-de-mi-cabeza.md";
  slug: "la-mancha-de-mi-cabeza";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"la-noche.md": {
	id: "la-noche.md";
  slug: "la-noche";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"la-zona-peru-page-1.md": {
	id: "la-zona-peru-page-1.md";
  slug: "la-zona-peru-page-1";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"la-zona-peru-page-2.md": {
	id: "la-zona-peru-page-2.md";
  slug: "la-zona-peru-page-2";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"la-zona-peru-page-3.md": {
	id: "la-zona-peru-page-3.md";
  slug: "la-zona-peru-page-3";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"las-vacunas-contra-el-covid-19-se-deberian-vender.md": {
	id: "las-vacunas-contra-el-covid-19-se-deberian-vender.md";
  slug: "las-vacunas-contra-el-covid-19-se-deberian-vender";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"lavado-de-cara-para-la-pagina.md": {
	id: "lavado-de-cara-para-la-pagina.md";
  slug: "lavado-de-cara-para-la-pagina";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"los-dias-de-un-ensimismado.md": {
	id: "los-dias-de-un-ensimismado.md";
  slug: "los-dias-de-un-ensimismado";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"media-vuelta.md": {
	id: "media-vuelta.md";
  slug: "media-vuelta";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"mi-mejor-amigo.md": {
	id: "mi-mejor-amigo.md";
  slug: "mi-mejor-amigo";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"mirando-en-tu-abismo.md": {
	id: "mirando-en-tu-abismo.md";
  slug: "mirando-en-tu-abismo";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"nos-siguen-pegando-abajo.md": {
	id: "nos-siguen-pegando-abajo.md";
  slug: "nos-siguen-pegando-abajo";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"oh-no-gates.md": {
	id: "oh-no-gates.md";
  slug: "oh-no-gates";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"playa-limeña.md": {
	id: "playa-limeña.md";
  slug: "playa-limeña";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"pronta-entrega.md": {
	id: "pronta-entrega.md";
  slug: "pronta-entrega";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"que-dia-de.md": {
	id: "que-dia-de.md";
  slug: "que-dia-de";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"quien-eres.md": {
	id: "quien-eres.md";
  slug: "quien-eres";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"regreso-a-casa.md": {
	id: "regreso-a-casa.md";
  slug: "regreso-a-casa";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"rondando-tu-esquina.md": {
	id: "rondando-tu-esquina.md";
  slug: "rondando-tu-esquina";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"semillero-de-la-humanidad.md": {
	id: "semillero-de-la-humanidad.md";
  slug: "semillero-de-la-humanidad";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"somos-una-contradiccion-.md": {
	id: "somos-una-contradiccion-.md";
  slug: "somos-una-contradiccion-";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"spider-man-fanfic-in-home.md": {
	id: "spider-man-fanfic-in-home.md";
  slug: "spider-man-fanfic-in-home";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"te-miro-con-odio-y-amor-2021.md": {
	id: "te-miro-con-odio-y-amor-2021.md";
  slug: "te-miro-con-odio-y-amor-2021";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"trunks-viaja-al-pasado.md": {
	id: "trunks-viaja-al-pasado.md";
  slug: "trunks-viaja-al-pasado";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"tu-pantalon-esta-lleno-de-tierra.md": {
	id: "tu-pantalon-esta-lleno-de-tierra.md";
  slug: "tu-pantalon-esta-lleno-de-tierra";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"una-corta-experiencia-de-mi-primer-trabajo.md": {
	id: "una-corta-experiencia-de-mi-primer-trabajo.md";
  slug: "una-corta-experiencia-de-mi-primer-trabajo";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
"volver-a-casa.md": {
	id: "volver-a-casa.md";
  slug: "volver-a-casa";
  body: string;
  collection: "relatos";
  data: InferEntrySchema<"relatos">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
