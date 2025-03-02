<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:game="https://pratyushguptachrist.github.io/Playtopia/"
    version="1.0">

    <xsl:output method="html" indent="yes" />

    <xsl:template match="/game:games">
        <xsl:for-each select="game:game">
            <div class="grid-item">
                <a href="{game:link}">
                <div class="grid-item">
                    <img src="{game:image}" class="game-img" alt=""/>
                    <strong class="game-name"><xsl:value-of select="game:name"/></strong>
                    <div class="game-info-btn">
                        <span class="game-info-btn-text">i</span>
                    </div>
                    </div>
                </a>
            </div>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>