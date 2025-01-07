export const leagueList = {
	matches: [
		{
			league: "Giải bóng đá nữ Algeria",
			games: [
				{
					time: "56'",
					home_team: "CLB nữ Akbou",
					away_team: "Afak Relizane (w)",
					score: "1 - 0",
          score_half: "1 - 0",
					status: "Đang diễn ra",
          local_time: "14:00",
          corner: "1 - 0",
          yellow_card: "1 - 0",
          red_card: "0 - 0",
				},
				{
					time: "HT",
					home_team: "CLB nữ Jf Khroub",
					away_team: "ASE Alger Centre (w)",
					score: "2 - 0",
          score_half: "1 - 0",
					status: "Nghỉ giữa hiệp",
          local_time: "12:00",
          corner: "1 - 0",
          yellow_card: "1 - 0",
          red_card: "0 - 0",
				},
			],
		},
		{
			league: "Siêu cúp Ấn Độ - Bảng đấu A",
			games: [
				{
					time: "90'",
					home_team: "Hyderabad",
					away_team: "Sreenidi Deccan",
					score: "1 - 4",
          score_half: "0 - 4",
					status: "Kết thúc",
          local_time: "16:00",
          corner: "1 - 0",
          yellow_card: "1 - 0",
          red_card: "0 - 0",
				},
			],
		},
		{
			league: "Premier League",
			games: [
				{
					time: "72'",
					home_team: "Manchester United",
					away_team: "Liverpool",
					score: "2 - 1",
					score_half: "1 - 0",
					status: "Đang diễn ra",
					local_time: "22:00",
					corner: "5 - 4",
					yellow_card: "2 - 3",
					red_card: "0 - 1",
				},
				{
					time: "55'",
					home_team: "Arsenal",
					away_team: "Chelsea",
					score: "3 - 0",
					score_half: "2 - 0",
					status: "Đang diễn ra",
					local_time: "21:00",
					corner: "7 - 3",
					yellow_card: "1 - 2",
					red_card: "0 - 0",
				}
			]
		},
		{
      league: "La Liga",
      games: [
        {
          time: "34'",
          home_team: "Valencia",
          away_team: "Villarreal",
          score: "0 - 0",
          score_half: "0 - 0",
          status: "Đang diễn ra",
          local_time: "20:30",
          corner: "3 - 2",
          yellow_card: "1 - 1",
          red_card: "0 - 0",
        },
        {
          time: "HT",
          home_team: "Athletic Bilbao",
          away_team: "Real Sociedad",
          score: "1 - 0",
          score_half: "1 - 0",
          status: "Nghỉ giữa hiệp",
          local_time: "20:00",
          corner: "4 - 2",
          yellow_card: "2 - 1",
          red_card: "0 - 0",
        },
        {
          time: "FT",
          home_team: "Real Madrid",
          away_team: "Barcelona",
          score: "3 - 2",
          score_half: "1 - 1",
          status: "Đã kết thúc",
          local_time: "19:00",
          corner: "6 - 5",
          yellow_card: "3 - 2",
          red_card: "0 - 0",
        }
      ]
    },
    {
      league: "Bundesliga",
      games: [
        {
          time: "12'",
          home_team: "Bayern Munich",
          away_team: "Dortmund",
          score: "1 - 0",
          score_half: "0 - 0",
          status: "Đang diễn ra",
          local_time: "18:30",
          corner: "2 - 1",
          yellow_card: "0 - 1",
          red_card: "0 - 0",
        },
        {
          time: "FT",
          home_team: "RB Leipzig",
          away_team: "Leverkusen",
          score: "2 - 2",
          score_half: "1 - 1",
          status: "Đã kết thúc",
          local_time: "16:30",
          corner: "6 - 4",
          yellow_card: "2 - 2",
          red_card: "0 - 0",
        }
      ]
    },
    {
      league: "Serie A",
      games: [
        {
          time: "86'",
          home_team: "AC Milan",
          away_team: "Inter Milan",
          score: "1 - 2",
          score_half: "0 - 1",
          status: "Đang diễn ra",
          local_time: "15:00",
          corner: "5 - 6",
          yellow_card: "3 - 2",
          red_card: "0 - 0",
        },
        {
          time: "FT",
          home_team: "Juventus",
          away_team: "Napoli",
          score: "2 - 1",
          score_half: "1 - 0",
          status: "Đã kết thúc",
          local_time: "13:00",
          corner: "4 - 5",
          yellow_card: "2 - 3",
          red_card: "0 - 0",
        }
      ]
    }
	]
}

export function simulateMatchUpdates(data) {
  const updatedData = JSON.parse(JSON.stringify(data));

  updatedData.matches.forEach(league => {
    league.games.forEach(game => {
      // Chỉ cập nhật các trận đang diễn ra
      if (game.status === "Đang diễn ra") {
        // Cập nhật thời gian
        const currentMinute = parseInt(game.time);
        if (currentMinute < 90) {
          game.time = `${currentMinute + 1}'`;
        } else {
          game.time = "FT";
          game.status = "Đã kết thúc";
        }

        // Mô phỏng có thể ghi bàn (xác suất 10%)
        if (Math.random() < 0.1) {
          const [homeScore, awayScore] = game.score.split(" - ").map(Number);
          // Xác định đội ghi bàn (50-50)
          if (Math.random() < 0.5) {
            game.score = `${homeScore + 1} - ${awayScore}`;
          } else {
            game.score = `${homeScore} - ${awayScore + 1}`;
          }
        }

        // Mô phỏng thẻ vàng (xác suất 5%)
        if (Math.random() < 0.05) {
          const [homeYellow, awayYellow] = game.yellow_card.split(" - ").map(Number);
          if (Math.random() < 0.5) {
            game.yellow_card = `${homeYellow + 1} - ${awayYellow}`;
          } else {
            game.yellow_card = `${homeYellow} - ${awayYellow + 1}`;
          }
        }

        // Mô phỏng phạt góc (xác suất 15%)
        if (Math.random() < 0.15) {
          const [homeCorner, awayCorner] = game.corner.split(" - ").map(Number);
          if (Math.random() < 0.5) {
            game.corner = `${homeCorner + 1} - ${awayCorner}`;
          } else {
            game.corner = `${homeCorner} - ${awayCorner + 1}`;
          }
        }
      }
    });
  });

  return updatedData;
}
