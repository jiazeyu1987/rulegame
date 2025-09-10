#!/usr/bin/env python3
"""
Day 1 Story Flowchart Data
Converted from Mermaid flowchart syntax to Python data structures
"""

# Day 1 Story Flowchart Data
flowchart_data = {
    "title": "第一天开始 - 优化版，确保死亡动画正常工作",
    "start_node": "N1",
    "nodes": {
        "N1": {
            "content": "卧室里弥漫着铁锈味，你头痛欲裂地醒来。窗外天色灰暗，墙上的全家福里家人的笑容扭曲变形。你感到一阵莫名的恐惧，但卧室门紧闭，暂时安全。",
            "is_death": False,
            "is_end": False
        },
        "N2": {
            "content": "你颤抖着拿起纸条，上面用血红色的字迹写着九条规则。每条规则都让你不寒而栗，特别是'卧室是安全的'这条，反而让你怀疑其他房间的危险性。纸条背面还有淡淡的抓痕。",
            "is_death": False,
            "is_end": False
        },
        "N3": {
            "content": "你环顾四周，发现房间里的摆设有些微妙的不协调。镜子的角度似乎被调整过，衣柜门微微敞开一条缝，窗台上有一撮不属于你的头发。最可怕的是，床底下传来轻微的抓挠声。",
            "is_death": False,
            "is_end": False
        },
        "N4": {
            "content": "你鼓起勇气直接打开卧室门，走廊里弥漫着腐肉的气味。昏暗的灯光下，你看见'家人'们背对着你站在走廊尽头，他们的脖子以不自然的角度扭动着。当你迈出第一步时，所有人都同时转过头来，脸上挂着诡异的微笑。",
            "is_death": False,
            "is_end": False
        },
        "N5": {
            "content": "你努力背诵着规则，但每读一条，纸条上的字迹就变得更加鲜红。'家人很爱你'这条让你特别不安，因为你清楚地记得现实中父母早已离异。背诵过程中，你听见门外传来沉重的脚步声，似乎在巡视每个房间。",
            "is_death": False,
            "is_end": False
        },
        "N6": {
            "content": "你将纸条丢在地上，瞬间感觉房间温度骤降。纸条落地的声音异常清脆，像是骨头断裂的声响。你注意到镜中的自己露出诡异的笑容，而现实中的你并没有笑。更可怕的是，纸条开始渗出暗红色的液体。",
            "is_death": False,
            "is_end": False
        },
        "N7": {
            "content": "你把纸条藏进口袋，立刻感到一阵刺痛。纸条仿佛有生命般紧贴你的皮肤，你能感觉到上面规则的每一个字都在蠕动。口袋开始发热，你担心纸条会灼伤你，但又不敢拿出来查看。",
            "is_death": False,
            "is_end": False
        },
        "N8": {
            "content": "你盯着镜子，发现镜中的自己动作总是慢半拍。更恐怖的是，镜中人的眼睛开始流血，而现实中的你并没有这种感觉。镜子的边缘开始渗出黑色的液体，散发着腐臭的气味。你想起规则说不要在镜子前停留超过30秒。",
            "is_death": False,
            "is_end": False
        },
        "N9": {
            "content": "你打开衣柜，一股腐臭扑面而来。里面挂着的衣服都沾满了暗红色的污渍，最可怕的是，你看见一件你从未见过的衣服——那是一件用人皮缝制的衣服，上面还残留着新鲜的指甲抓痕。衣柜深处传来低沉的啜泣声。",
            "is_death": False,
            "is_end": False
        },
        "N10": {
            "content": "你推开窗户，外面的景象让你毛骨悚然。小区里空无一人，但每家每户的窗户里都站着人影，他们全都面向你的方向。更恐怖的是，你看见楼下有一只巨大的黑狗，它的眼睛是人类的眼睛，正直勾勾地盯着你，眼神中充满警告。",
            "is_death": False,
            "is_end": False
        },
        "N11": {
            "content": "你沿着走廊前行，地板每走一步都会发出不堪重负的呻吟。墙上挂着的家庭照片里，人物的眼睛都在随着你的移动而转动。走廊尽头传来锅铲碰撞的声音，还有某种液体滴落的声响，你猜测那是厨房的方向。",
            "is_death": False,
            "is_end": False
        },
        "N12": {
            "content": "你走进厨房，发现妈妈背对着你在灶台前忙碌。锅里煮着的东西散发着令人作呕的腐臭，但你看见她正在往里面添加一些红色的块状物。当你走近时，她转过头来，脸上沾满了鲜血，手里还拿着一根人的手指。",
            "is_death": False,
            "is_end": False
        },
        "N13": {
            "content": "你决定继续探索这个诡异的家。每经过一个房间，你都能听见里面传来不同的声音：卫生间有水滴声但夹杂着啜泣，客厅有电视声但播放的是扭曲的尖叫，阳台有风声但听起来像有人在低语。你必须小心选择下一步。",
            "is_death": False,
            "is_end": False
        },
        "N14": {
            "content": "你偷偷从厨房门缝往里看，发现爸爸正站在餐桌旁。他手里拿着一把巨大的剁骨刀，正在分解某种肉类。当你看清那是什么时，差点呕吐出来——那是一具人类的尸体，而爸爸正专注地将它切成适合烹饪的大小。",
            "is_death": False,
            "is_end": False
        },
        "N15": {
            "content": "你回到床上等待，但床变得越来越不舒服。床垫下似乎有什么东西在蠕动，被子变得异常沉重。你听见床底下传来低沉的呼吸声，还有指甲刮擦木板的声音。最可怕的是，你开始怀疑卧室是否真的如规则所说的那样安全。",
            "is_death": False,
            "is_end": False
        },
        "N16": {
            "content": "你从柜子深处掏出一张泛黄的纸条，上面用褪色的墨水写着一些你从未见过的规则。当你阅读时，纸条开始渗出新鲜的血液，字迹逐渐变成你熟悉的笔迹——那是你自己的笔迹，但你完全不记得曾经写过这些规则。",
            "is_death": False,
            "is_end": False
        },
        "N17": {
            "content": "你踏入客厅，发现这里的景象与记忆中完全不同。家具都覆盖着一层黑色的霉菌，天花板上垂下无数条像是脐带的东西。电视自己打开着，播放着雪花屏，但你能从雪花中隐约看见无数张痛苦的人脸在尖叫。",
            "is_death": False,
            "is_end": False
        },
        "N18": {
            "content": "你敲响旁边房间的门，门内立刻传来激烈的回应。有什么东西猛烈地撞击着门板，发出非人类的嘶吼声。门缝下渗出黑色的液体，散发着腐臭的气味。你听见门内传来你自己的声音在呼救，但那声音充满了痛苦和绝望。",
            "is_death": False,
            "is_end": False
        },
        "N19": {
            "content": "你坐在餐桌前，妈妈端来一盘'食物'。当你看清盘子里是什么时，胃部一阵痉挛——那是用人类器官精心烹制的'佳肴'，心脏被做成了主菜，眼球被装饰在盘子边缘。妈妈期待地看着你，脸上挂着慈母般的微笑。",
            "is_death": False,
            "is_end": False
        },
        "N20": {
            "content": "你观察地上的影子，发现它们的行为与主人完全不符。妈妈的影子显示她正在撕咬什么东西，爸爸的影子有着巨大的角和翅膀，而你的影子——最恐怖的是，你的影子正在慢慢地站起来，准备离开你的身体。",
            "is_death": False,
            "is_end": False
        },
        "DEAD1": {
            "content": "你死了：你向走廊的'家人'打招呼，他们瞬间移动到离你只有几厘米的距离。你看见他们的嘴巴裂开到耳根，露出里面密密麻麻的尖牙。'终于找到你了'他们异口同声地说，然后你的身体开始融化，被它们分食殆尽。",
            "is_death": True,
            "is_end": False
        },
        "DEAD2": {
            "content": "你死了：你趴下查看床底，看见一双布满血丝的眼睛正盯着你。一只苍白的手突然伸出，抓住你的头发将你拖入床底。你听见骨头被咀嚼的声音，但很快意识到那是你自己的骨头在床底下被碾碎的声音。",
            "is_death": True,
            "is_end": False
        },
        "DEAD3": {
            "content": "你死了：你继续凝视镜子，镜中人突然露出狰狞的笑容。它的手穿过镜面抓住你的肩膀，将你拉入镜中世界。你被困在镜子里，看着镜外人占据你的身体，走向家人，而你永远成为镜中的倒影。",
            "is_death": True,
            "is_end": False
        },
        "DEAD4": {
            "content": "你死了：你伸手触摸镜子，镜面突然变得如同液体般柔软。你的手臂被吸入镜中，接着是整个身体。在镜中世界里，你看见无数个自己被永远困在这里，而你的家人正在镜外享用你的血肉。",
            "is_death": True,
            "is_end": False
        },
        "DEAD5": {
            "content": "你死了：你丢掉衣柜里的娃娃，瞬间听见一声尖锐的婴儿啼哭。衣柜门猛地关闭，里面传来激烈的抓挠声和咀嚼声。当你再次打开衣柜时，里面挂满了用你皮肤制成的衣服，而你的头颅被缝在最大的那件衣服上作为装饰。",
            "is_death": True,
            "is_end": False
        },
        "DEAD6": {
            "content": "你死了：你敲击窗户玻璃，整面窗户突然碎裂。外面的'邻居'们蜂拥而入，他们的身体扭曲变形，长出无数触手将你缠绕。你看见他们的脸开始融化，露出下面血淋淋的肌肉组织，然后你感觉自己的皮肤也开始剥离。",
            "is_death": True,
            "is_end": False
        },
        "DEAD7": {
            "content": "你死了：你强行拉开窗户，一股黑色的雾气涌入房间。雾气中浮现出无数张痛苦的人脸，它们发出撕心裂肺的尖叫。你的身体开始腐烂，皮肤一块块脱落，露出下面蠕动的黑色触手，最终你成为了这团雾气的一部分。",
            "is_death": True,
            "is_end": False
        },
        "DAY2": {
            "content": "你成功度过了第一天，但你知道这只是开始...",
            "is_death": False,
            "is_end": True
        }
    },
    "edges": [
        # N1 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N1", "to": "N2", "label": "看纸条1", "time_change": 15},
        {"from": "N1", "to": "N3", "label": "观察房间", "time_change": 20},
        {"from": "N1", "to": "N4", "label": "直接开门", "time_change": 10},
        
        # N2 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N2", "to": "N5", "label": "背下规则", "time_change": 25},
        {"from": "N2", "to": "N6", "label": "丢掉纸条", "time_change": 10},
        {"from": "N2", "to": "N7", "label": "藏进口袋", "time_change": 15},
        
        # N3 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N3", "to": "N8", "label": "盯镜子", "time_change": 30},
        {"from": "N3", "to": "N9", "label": "开柜子", "time_change": 20},
        {"from": "N3", "to": "N10", "label": "开窗户", "time_change": 15},
        
        # N4 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N4", "to": "DEAD1", "label": "打招呼", "time_change": 10},
        {"from": "N4", "to": "N1", "label": "回卧室", "time_change": 5},
        {"from": "N4", "to": "N11", "label": "继续走", "time_change": 20},
        
        # N5 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N5", "to": "N12", "label": "去厨房", "time_change": 25},
        {"from": "N5", "to": "N13", "label": "探索", "time_change": 30},
        {"from": "N5", "to": "N14", "label": "偷看厨房", "time_change": 15},
        
        # N6 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N6", "to": "N2", "label": "捡起来看", "time_change": 10},
        {"from": "N6", "to": "N4", "label": "直接开门", "time_change": 5},
        {"from": "N6", "to": "DEAD2", "label": "检查床底", "time_change": 20},
        
        # N7 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N7", "to": "N4", "label": "开门", "time_change": 10},
        {"from": "N7", "to": "N8", "label": "照镜子", "time_change": 25},
        {"from": "N7", "to": "N15", "label": "继续等待", "time_change": 30},
        
        # N8 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N8", "to": "DEAD3", "label": "继续凝视", "time_change": 30},
        {"from": "N8", "to": "N13", "label": "闭眼转身", "time_change": 10},
        {"from": "N8", "to": "DEAD4", "label": "伸手摸镜", "time_change": 15},
        
        # N9 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N9", "to": "N16", "label": "拿出纸条", "time_change": 20},
        {"from": "N9", "to": "DEAD5", "label": "丢掉娃娃", "time_change": 10},
        {"from": "N9", "to": "N5", "label": "关上柜子", "time_change": 15},
        
        # N10 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N10", "to": "DEAD6", "label": "敲玻璃", "time_change": 25},
        {"from": "N10", "to": "N5", "label": "退开", "time_change": 10},
        {"from": "N10", "to": "DEAD7", "label": "强拉", "time_change": 20},
        
        # N11 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N11", "to": "N17", "label": "进入客厅", "time_change": 30},
        {"from": "N11", "to": "N1", "label": "折返卧室", "time_change": 15},
        {"from": "N11", "to": "N18", "label": "敲门", "time_change": 20},
        
        # N12 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N12", "to": "N19", "label": "坐下", "time_change": 25},
        {"from": "N12", "to": "N20", "label": "看影子", "time_change": 20},
        {"from": "N12", "to": "N1", "label": "逃回卧室", "time_change": 10},
        
        # N13 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N13", "to": "N11", "label": "继续走廊", "time_change": 20},
        {"from": "N13", "to": "DAY2", "label": "回卧室休息", "time_change": 30},
        {"from": "N13", "to": "N18", "label": "乱开门", "time_change": 15},
        
        # N14 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N14", "to": "DEAD1", "label": "继续偷看", "time_change": 25},
        {"from": "N14", "to": "N12", "label": "冲进厨房", "time_change": 10},
        {"from": "N14", "to": "N13", "label": "悄悄离开", "time_change": 15},
        
        # N15 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N15", "to": "DAY2", "label": "困意袭来 睡着", "time_change": 30},
        {"from": "N15", "to": "DEAD2", "label": "梦见镜子", "time_change": 20},
        {"from": "N15", "to": "N12", "label": "被呼唤拉走", "time_change": 15},
        
        # N16 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N16", "to": "N5", "label": "纸条燃烧", "time_change": 10},
        {"from": "N16", "to": "DEAD3", "label": "血迹扩散", "time_change": 25},
        {"from": "N16", "to": "N7", "label": "藏进口袋", "time_change": 15},
        
        # N17 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N17", "to": "N13", "label": "客厅电视亮起", "time_change": 20},
        {"from": "N17", "to": "DEAD4", "label": "陌生人坐沙发", "time_change": 10},
        {"from": "N17", "to": "DAY2", "label": "关灯返回卧室", "time_change": 30},
        
        # N18 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N18", "to": "DEAD5", "label": "开门", "time_change": 15},
        {"from": "N18", "to": "N13", "label": "听里面声音", "time_change": 20},
        {"from": "N18", "to": "N1", "label": "返回卧室", "time_change": 10},
        
        # N19 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N19", "to": "DEAD6", "label": "食物变腐烂", "time_change": 25},
        {"from": "N19", "to": "N20", "label": "假装吃", "time_change": 20},
        {"from": "N19", "to": "N13", "label": "跑开", "time_change": 15},
        
        # N20 connections - 时间配置：每个选择增加10-30分钟
        {"from": "N20", "to": "DEAD7", "label": "发现影子异常", "time_change": 30},
        {"from": "N20", "to": "N12", "label": "装作没发现", "time_change": 20},
        {"from": "N20", "to": "N13", "label": "逃离厨房", "time_change": 25}
    ]
}

# Alternative format using tuples for edges (from_node, label, to_node)
flowchart_data_tuples = {
    "title": "第一天开始 - 优化版，确保死亡动画正常工作",
    "start_node": "N1",
    "nodes": {
        "N1": "卧室里弥漫着铁锈味，你头痛欲裂地醒来。窗外天色灰暗，墙上的全家福里家人的笑容扭曲变形。你感到一阵莫名的恐惧，但卧室门紧闭，暂时安全。",
        "N2": "你颤抖着拿起纸条，上面用血红色的字迹写着九条规则。每条规则都让你不寒而栗，特别是'卧室是安全的'这条，反而让你怀疑其他房间的危险性。纸条背面还有淡淡的抓痕。",
        "N3": "你环顾四周，发现房间里的摆设有些微妙的不协调。镜子的角度似乎被调整过，衣柜门微微敞开一条缝，窗台上有一撮不属于你的头发。最可怕的是，床底下传来轻微的抓挠声。",
        "N4": "你鼓起勇气直接打开卧室门，走廊里弥漫着腐肉的气味。昏暗的灯光下，你看见'家人'们背对着你站在走廊尽头，他们的脖子以不自然的角度扭动着。当你迈出第一步时，所有人都同时转过头来，脸上挂着诡异的微笑。",
        "DEAD1": "你死了：你向走廊的'家人'打招呼，他们瞬间移动到离你只有几厘米的距离。你看见他们的嘴巴裂开到耳根，露出里面密密麻麻的尖牙。'终于找到你了'他们异口同声地说，然后你的身体开始融化，被它们分食殆尽。"
    },
    "edges": [
        ("N1", "看纸条1", "N2"),
        ("N1", "观察房间", "N3"),
        ("N1", "直接开门", "N4"),
        ("N2", "背下规则", "N5"),
        ("N2", "丢掉纸条", "N6"),
        ("N4", "打招呼", "DEAD1")
    ]
}

# Mermaid text format (can be parsed directly)
mermaid_text = '''flowchart TD

%% 第一天开始 - 优化版，确保死亡动画正常工作
N1["卧室里弥漫着铁锈味，你头痛欲裂地醒来。窗外天色灰暗，墙上的全家福里家人的笑容扭曲变形。你感到一阵莫名的恐惧，但卧室门紧闭，暂时安全。"]
N1 -->|"看纸条1"| N2
N1 -->|"观察房间"| N3
N1 -->|"直接开门"| N4

N2["你颤抖着拿起纸条，上面用血红色的字迹写着九条规则。每条规则都让你不寒而栗，特别是'卧室是安全的'这条，反而让你怀疑其他房间的危险性。纸条背面还有淡淡的抓痕。"]
N2 -->|"背下规则"| N5
N2 -->|"丢掉纸条"| N6
N2 -->|"藏进口袋"| N7

N3["你环顾四周，发现房间里的摆设有些微妙的不协调。镜子的角度似乎被调整过，衣柜门微微敞开一条缝，窗台上有一撮不属于你的头发。最可怕的是，床底下传来轻微的抓挠声。"]
N3 -->|"盯镜子"| N8
N3 -->|"开柜子"| N9
N3 -->|"开窗户"| N10

N4["你鼓起勇气直接打开卧室门，走廊里弥漫着腐肉的气味。昏暗的灯光下，你看见'家人'们背对着你站在走廊尽头，他们的脖子以不自然的角度扭动着。当你迈出第一步时，所有人都同时转过头来，脸上挂着诡异的微笑。"]
N4 -->|"打招呼"| DEAD1
N4 -->|"回卧室"| N1
N4 -->|"继续走"| N11

DEAD1["你死了：你向走廊的'家人'打招呼，他们瞬间移动到离你只有几厘米的距离。你看见他们的嘴巴裂开到耳根，露出里面密密麻麻的尖牙。'终于找到你了'他们异口同声地说，然后你的身体开始融化，被它们分食殆尽。"]
'''

# Export all formats
__all__ = ['flowchart_data', 'flowchart_data_tuples', 'mermaid_text']