import {
	Checkbox,
	Divider,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	Link,
	Lozenge,
	LozengeVariants,
} from "@controlkit/ui";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { open } from "@tauri-apps/plugin-shell";

import { bundledLanguages, bundledThemes, createHighlighter } from "shiki";
import * as stylex from "@stylexjs/stylex";

// import "./shiki_temp.css";

const highlighter = await createHighlighter({
	themes: Object.keys(bundledThemes),
	langs: Object.keys(bundledLanguages),
});

highlighter.codeToHtml("const a = 1", {
	lang: "javascript",
	theme: "poimandres",
});

const styles = stylex.create({
	container: {
		width: "100%",
		boxSizing: "border-box",
		padding: "1rem",
	},
});

export function Editor(props: any) {
	return (
		<>
			<div
				onClick={() => {
					console.log(JSON.stringify(props.value));
				}}
				style={{
					backgroundColor: "var(--color-bg-compliment)",
					padding: "0.5rem 1rem",
					margin: "1rem",
					borderRadius: "0.5rem",
				}}
			>
				<Markdown
					remarkPlugins={[remarkGfm]}
					components={{
						h1(props) {
							return <H1 style={{ padding: "0.5rem 0" }}>{props.children}</H1>;
						},

						h2(props) {
							return <H2 style={{ padding: "0.5rem 0" }}>{props.children}</H2>;
						},

						h3(props) {
							return <H3 style={{ padding: "0.5rem 0" }}>{props.children}</H3>;
						},

						h4(props) {
							return <H4 style={{ padding: "0.5rem 0" }}>{props.children}</H4>;
						},

						h5(props) {
							return <H5 style={{ padding: "0.5rem 0" }}>{props.children}</H5>;
						},

						h6(props) {
							return <H6 style={{ padding: "0.5rem 0" }}>{props.children}</H6>;
						},

						hr(props) {
							return (
								<Divider
									style={{
										marginTop: "0.5rem",
									}}
								/>
							);
						},

						a(props) {
							return (
								<Link
									style={{
										cursor: "pointer",
									}}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();

										// TODO: should check if valid or safe url incase of hallucination

										open(props.href);
									}}
								>
									{props.children}
								</Link>
							);
						},

						input(props) {
							return (
								<Checkbox
									checked={props.checked}
									disabled={true}
									style={{
										opacity: 1.0,
										display: "inline-flex",
										marginRight: "0.25rem",
									}}
								/>
							);
						},

						th(props) {
							return (
								<th
									style={{
										backgroundColor: "var(--cds-gray-100)",
										borderRight: "1px solid var(--border-color)",
										padding: "0.125rem 0.5rem",
										outline: "var(--cds-gray-400) solid 1px",
									}}
								>
									{props.children}
								</th>
							);
						},

						td(props) {
							return (
								<td
									style={{
										// backgroundColor: "var(--btn-ghost-hover-background)",
										padding: "0.125rem 0.5rem",
										outline: "var(--cds-gray-400) solid 1px",
									}}
								>
									{props.children}
								</td>
							);
						},

						p(props) {
							return (
								<p
									style={{
										paddingBlock: "0.5rem",
										// background:"red",
									}}
								>
									{props.children}
								</p>
							);
						},

						code(props) {
							if (props.className === undefined) {
								return (
									<Lozenge
										variant={LozengeVariants.IN_PROGRESS}
										style={{
											display: "inline",
										}}
									>
										{props.children}
									</Lozenge>
								);
							}

							// console.log(props);
							return (
								<CodeBlockHelper language={props.className}>
									{props.children}
								</CodeBlockHelper>
							);
						},

						blockquote(props) {
							return (
								<blockquote
									style={{
										backgroundColor: "var(--cds-gray-200)",
										borderLeft: "0.25rem solid var(--cds-blue-200)",
										margin: "0",
										padding: "0.25rem 0.75rem",
										borderRadius: "0.5rem",
									}}
								>
									{props.children}
								</blockquote>
							);
						},
					}}
				>
					{props.value}
				</Markdown>
			</div>
		</>
	);
}

function CodeBlockHelper(props: any) {
	// some generations are awkward enough to cause errors try catch for safety
	try {
		const code = highlighter.codeToHtml(props.children, {
			lang: props.language.substring(props.language.indexOf("-") + 1),
			// theme: "github-dark-high-contrast",
			theme: "dark-plus",
		});

		return (
			<div
				style={{
					borderRadius: "0.5rem",
				}}
			>
				<div
					style={{
						backgroundColor: "var(--code-block-background)",
						borderRadius: "0.5rem 0.5rem 0 0",
						padding: "0.25rem 0.5rem",
					}}
				>
					{props.language.substring(props.language.indexOf("-") + 1)}
				</div>

				<div
					style={{
						padding: "0.0625rem 0.5rem",
						backgroundColor: "#1e1e1e",
						borderRadius: "0 0 0.5rem 0.5rem",
					}}
				>
					<div
						dangerouslySetInnerHTML={{ __html: code }}
						style={{
							borderRadius: "0.5rem",
							backgroundColor: "#1e1e1e",
						}}
					/>
				</div>
			</div>
		);
	} catch {
		return (
			<div
				style={{
					borderRadius: "0.5rem",
				}}
			>
				{props.children}
			</div>
		);
	}
}
