import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({blocks}) => {

    const loaderProp =({ src }) => {
        return src;
    }

    return blocks.map(block => {
        switch(block.name) {
            case 'acf/ctabutton': {
                return (
                    <CallToActionButton 
                        key={block.id} 
                        buttonLabel={block.attributes.data.label}
                        destination={block.attributes.data.destination || "/"}
                        align={block.attributes.data.align}
                    />
                )
            }
            case 'core/column': {
                return (
                    <Column key={block.id} >
                        <BlockRenderer blocks={block.innerBlocks} width={block.attributes.width} />
                    </Column>
                )
            }
            case 'core/columns': {
                return (
                    <Columns key={block.id} isStackedOnMobile={block.attributes.isStackedOnMobile} >
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Columns>
                )
            }
            case 'core/cover': {
                return (
                    <Cover key={block.id} background={block.attributes.url}>
                        <BlockRenderer blocks={block.innerBlocks} />
                    </Cover>
                );
            }
            case 'core/block':
            case 'core/group': {
                return <BlockRenderer id={block.id} blocks={block.innerBlocks} />
            }
            case 'core/heading': {
                return (
                    <Heading 
                        key={block.id} 
                        level={block.attributes.level} 
                        content={block.attributes.content}
                        textAlign={block.attributes.textAlign}
                    />
                )
            }
            case 'core/paragraph': {
                return (
                    <Paragraph 
                        key={block.id} 
                        textAlign={block.attributes.align} 
                        content={block.attributes.content} 
                        textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
                    />
                )
            }
            case 'core/image': {
                return (
                    <Image 
                        key={block.id} 
                        src={block.attributes.url} 
                        height={block.attributes.originalHeight}
                        width={block.attributes.originalWidth}
                        alt={block.attributes.alt || ""}
                        loader={loaderProp}
                    />
                );
            }
            default: 
            console.log("[UNKNOWN BLOCK]: ", block)
            return null;
        }
    });
};