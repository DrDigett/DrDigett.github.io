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
		"articulos": {
"Dark-souls-y.md": {
	id: "Dark-souls-y.md";
  slug: "dark-souls-y";
  body: string;
  collection: "articulos";
  data: InferEntrySchema<"articulos">
} & { render(): Render[".md"] };
"La-toma-del-software-el-tecno-obrero.md": {
	id: "La-toma-del-software-el-tecno-obrero.md";
  slug: "la-toma-del-software-el-tecno-obrero";
  body: string;
  collection: "articulos";
  data: InferEntrySchema<"articulos">
} & { render(): Render[".md"] };
"Ser-razonables.md": {
	id: "Ser-razonables.md";
  slug: "ser-razonables";
  body: string;
  collection: "articulos";
  data: InferEntrySchema<"articulos">
} & { render(): Render[".md"] };
"doom-y-doom-2.md": {
	id: "doom-y-doom-2.md";
  slug: "doom-y-doom-2";
  body: string;
  collection: "articulos";
  data: InferEntrySchema<"articulos">
} & { render(): Render[".md"] };
};
"relatos": {
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
